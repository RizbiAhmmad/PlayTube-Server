import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";

const router = Router();

// Create a review (authenticated users)
router.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview,
);

// Get all reviews (admin/public list)
router.get("/", ReviewController.getAllReviews);

// Get my reviews (logged-in user)
router.get(
  "/my-reviews",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  ReviewController.getMyReviews,
);

// Get approved reviews for a specific media
router.get("/media/:mediaId", ReviewController.getReviewsByMedia);

// Get single review
router.get("/:id", ReviewController.getReviewById);

// Update review (admin moderation: change status)
router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview,
);

// Delete review (user deletes own PENDING, admin deletes any)
router.delete(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  ReviewController.deleteReview,
);

export const ReviewRoutes = router;
