import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { CommentController } from "./comment.controller";
import { CommentValidation } from "./comment.validation";

const router = Router();

router.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(CommentValidation.createCommentZodSchema),
  CommentController.createComment,
);

router.get(
  "/:reviewId",
  CommentController.getCommentsByReview,
);

router.patch(
  "/:id",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(CommentValidation.updateCommentZodSchema),
  CommentController.updateComment,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.USER),
  CommentController.deleteComment,
);

export const CommentRoutes = router;
