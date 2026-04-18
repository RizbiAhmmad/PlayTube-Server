import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { PaymentController } from "./payment.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create-checkout-session",
  PaymentController.createCheckoutSession,
);
router.get(
  "/my-payments",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  PaymentController.getMyPayments,
);
router.get(
  "/all-payments",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  PaymentController.getAllPayments,
);

export const PaymentRoutes = router;
