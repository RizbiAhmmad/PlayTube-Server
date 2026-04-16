/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import { PaymentStatus } from "../../../generated/prisma/client";
import { uploadFileToCloudinary } from "../../config/cloudinary.config";
import { envVars } from "../../config/env";
import { stripe } from "../../config/stripe.config";
import { prisma } from "../../lib/prisma";
import { sendEmail } from "../../utils/email";
import { generateInvoicePdf } from "./payment.utils";

const createCheckoutSession = async (payload: { userId: string; mediaId?: string; amount: number; paymentType: 'PURCHASE' | 'RENT' | 'SUBSCRIPTION' }) => {
    const { userId, mediaId, amount, paymentType } = payload;

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error("User not found");
    }

    let media = null;
    if (mediaId) {
        media = await prisma.media.findUnique({
            where: { id: mediaId }
        });
        if (!media) throw new Error("Media not found");
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: user.email,
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: media ? `Purchase: ${media.title}` : "Subscription",
                        description: media ? media.description : "PlayTube Premium Subscription",
                    },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
        metadata: {
            userId,
            mediaId: mediaId || "",
            paymentType,
        },
    });

    return session;
};

const handleStripeWebhookEvent = async (event: Stripe.Event) => {
    console.log(`🔔 Webhook received: ${event.type} (ID: ${event.id})`);
    
    const existingPayment = await prisma.payment.findFirst({
        where: {
            stripeEventId: event.id
        }
    });

    if (existingPayment) {
        console.log(`Event ${event.id} already processed. Skipping`);
        return { message: `Event ${event.id} already processed. Skipping` };
    }

    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as any;
            console.log("📦 Checkout Session Completed Metadata:", session.metadata);

            const userId = session.metadata?.userId;
            const mediaId = session.metadata?.mediaId;
            const paymentType = session.metadata?.paymentType;

            if (!userId) {
                console.error("⚠️ Missing metadata in webhook event");
                return { message: "Missing metadata" };
            }

            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                console.error(`⚠️ User ${userId} not found.`);
                return { message: "User not found" };
            }

            let media = null;
            if (mediaId) {
                media = await prisma.media.findUnique({
                    where: { id: mediaId }
                });
            }

            let pdfBuffer: Buffer | null = null;
            let invoiceUrl = null;

            const transactionId = session.payment_intent as string;

            if (session.payment_status === "paid") {
                try {
                    // Generate invoice PDF
                    pdfBuffer = await generateInvoicePdf({
                        invoiceId: `INV-${Date.now()}`,
                        userName: user.name,
                        userEmail: user.email,
                        mediaTitle: media?.title,
                        amount: session.amount_total / 100,
                        transactionId: transactionId,
                        paymentDate: new Date().toISOString()
                    });

                    // Upload PDF to Cloudinary
                    const cloudinaryResponse = await uploadFileToCloudinary(
                        pdfBuffer,
                        `playtube/invoices/invoice-${transactionId}-${Date.now()}.pdf`
                    );

                    invoiceUrl = cloudinaryResponse?.secure_url;

                    console.log(`✅ Invoice PDF generated and uploaded`);
                } catch (pdfError) {
                    console.error("❌ Error generating/uploading invoice PDF:", pdfError);
                }
            }

            console.log("💾 Saving payment record to database...");
            const paymentRecord = await prisma.payment.create({
                data: {
                    amount: session.amount_total / 100,
                    transactionId: transactionId,
                    stripeEventId: event.id,
                    status: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID,
                    paymentType: paymentType as any,
                    invoiceUrl: invoiceUrl,
                    paymentGatewayData: session as any,
                    userId: userId,
                    mediaId: mediaId || null
                }
            });
            console.log("✅ Payment record saved:", paymentRecord.id);

            // Send invoice email to user
            if (session.payment_status === "paid") {
                try {
                    await sendEmail({
                        to: user.email,
                        subject: `Payment Confirmation & Invoice - PlayTube`,
                        templateName: "invoice",
                        templateData: {
                            userName: user.name,
                            invoiceId: `INV-${Date.now()}`,
                            transactionId: transactionId,
                            paymentDate: new Date().toLocaleDateString(),
                            mediaTitle: media?.title,
                            amount: session.amount_total / 100,
                            invoiceUrl: invoiceUrl,
                            frontendUrl: envVars.FRONTEND_URL
                        },
                        attachments: pdfBuffer ? [
                            {
                                filename: `Invoice-${transactionId}.pdf`,
                                content: pdfBuffer,
                                contentType: 'application/pdf'
                            }
                        ] : []
                    });
                    console.log(`✅ Invoice email sent to ${user.email}`);
                } catch (emailError) {
                    console.error("❌ Error sending invoice email:", emailError);
                }
            }
            
            console.log(`✅ Payment ${session.payment_status} for user ${userId}`);
            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return { message: `Webhook Event ${event.id} processed successfully` };
};

export const PaymentService = {
    createCheckoutSession,
    handleStripeWebhookEvent
};
