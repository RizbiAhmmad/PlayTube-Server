import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { envVars } from "../config/env";
import { Role, UserStatus } from "../../generated/prisma/enums";
// If your Prisma file is located elsewhere, you can change the path

const adapter = new PrismaPg({ connectionString: envVars.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword:{
        enabled: true,
        requireEmailVerification: false,
    },

     socialProviders:{
        google:{
            clientId: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            // callbackUrl: envVars.GOOGLE_CALLBACK_URL,
            mapProfileToUser: ()=>{
                return {
                    role : Role.USER,
                    status : UserStatus.ACTIVE,
                    needPasswordChange : false,
                    emailVerified : true,
                    isDeleted : false,
                    deletedAt : null,
                }
            }
        }
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "USER",
            },
            status: {
                type: "string",
                required: false,
                defaultValue: "ACTIVE",
            },
            isDeleted: {
                type: "boolean",
                required: false,
                defaultValue: false,
            },
            needPasswordChange: {
                type: "boolean",
                required: false,
                defaultValue: false,
            }
        }
    }
});