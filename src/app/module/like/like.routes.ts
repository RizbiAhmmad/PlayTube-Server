import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { LikeController } from "./like.controller";
import { LikeValidation } from "./like.validation";

const router = Router();

router.post(
  "/toggle",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(LikeValidation.toggleLikeZodSchema),
  LikeController.toggleLike,
);

router.get(
  "/:reviewId",
  LikeController.getLikesByReview,
);

export const LikeRoutes = router;
