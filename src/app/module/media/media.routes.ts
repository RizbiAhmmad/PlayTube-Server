import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { MediaController } from "./media.controller";
import { MediaValidation } from "./media.validation";

const router = Router();

router.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(MediaValidation.createMediaZodSchema as any),
  MediaController.createMedia,
);

router.get("/", MediaController.getAllMedia);
router.get("/:id", MediaController.getMediaById);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(MediaValidation.updateMediaZodSchema as any),
  MediaController.updateMedia,
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  MediaController.deleteMedia,
);

export const MediaRoutes = router;
