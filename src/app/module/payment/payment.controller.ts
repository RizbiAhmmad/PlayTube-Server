import { Request, Response } from "express";
import status from "http-status";
import { envVars } from "../../config/env";
import { stripe } from "../../config/stripe.config";
import { IRequestUser } from "../../interfaces/requestUser";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { PaymentService } from "./payment.service";

const createCheckoutSession = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentService.createCheckoutSession(req.body);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Checkout session created successfully",
        data: result
    });
});

const handleStripeWebhookEvent = catchAsync(async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'];
    const webhookSecret = envVars.STRIPE.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        console.error("Missing Stripe signature or webhook secret");
        return res.status(status.BAD_REQUEST).json({ message: "Missing Stripe signature or webhook secret" });
    }

    const signatureString = Array.isArray(signature) ? signature[0] : signature;

    if (!signatureString) {
        return res.status(status.BAD_REQUEST).json({ message: "Invalid Stripe signature" });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body as string | Buffer,
            signatureString,
            webhookSecret as string
        );
    } catch (error: unknown) {
        console.error("Error processing Stripe webhook:", error);
        return res.status(status.BAD_REQUEST).json({ message: `Webhook Error: ${(error as Error).message}` });
    }

    const result = await PaymentService.handleStripeWebhookEvent(event);

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Stripe webhook event processed successfully",
        data: result
    });
});

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
    // Assuming userId is attached to req.user by auth middleware
    const user = req.user as IRequestUser;
    const userId = (user?.userId || req.params.userId) as string;
    const result = await PaymentService.getMyPayments(userId);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Payment history fetched successfully",
        data: result
    });
});

const getAllPayments = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentService.getAllPayments();
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "All payments fetched successfully",
        data: result
    });
});

export const PaymentController = {
    createCheckoutSession,
    handleStripeWebhookEvent,
    getMyPayments,
    getAllPayments
};
