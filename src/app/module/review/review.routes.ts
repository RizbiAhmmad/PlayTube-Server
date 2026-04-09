import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";

const router = Router();

router.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview,
);

router.get("/", ReviewController.getAllReviews);

router.get("/:id", ReviewController.getReviewById);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN), // Moderation
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview,
);

router.delete(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  ReviewController.deleteReview,
);

export const ReviewRoutes = router;
