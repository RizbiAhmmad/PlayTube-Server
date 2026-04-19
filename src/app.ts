/* eslint-disable @typescript-eslint/no-explicit-any */
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import path from "path";
import qs from "qs";
import { envVars } from "./app/config/env";
import { auth } from "./app/lib/auth";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { PaymentController } from "./app/module/payment/payment.controller";
import { IndexRoutes } from "./app/routes";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/app/templates"));

app.set("query parser", (str: string) => qs.parse(str));

// Global request logger for debugging
app.use((req, res, next) => {
  console.log(`🚀 [${req.method}] ${req.url}`);
  next();
});

// 1. Stripe Webhook (MUST be at the very top, before any body-parsing middleware)
app.get("/test-webhook", (req, res) => {
  res.send("Webhook route is reachable!");
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  PaymentController.handleStripeWebhookEvent,
);

// 2. CORS and Auth
app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", toNodeHandler(auth));

// 3. General Parsers (These must come AFTER the /webhook route)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// application routes
app.use("/api/v1", IndexRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from PlayTube World!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
