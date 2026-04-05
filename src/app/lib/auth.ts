import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { envVars } from "../config/env";
// If your Prisma file is located elsewhere, you can change the path

const adapter = new PrismaPg({ connectionString: envVars.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword:{
        enabled: true,
    }
});