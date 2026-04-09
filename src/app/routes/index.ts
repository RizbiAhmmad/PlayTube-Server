import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.router";
import { AdminRoutes } from "../module/admin/admin.route";
import { MediaRoutes } from "../module/media/media.routes";
import { ReviewRoutes } from "../module/review/review.routes";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admins", AdminRoutes);
router.use("/media", MediaRoutes);
router.use("/reviews", ReviewRoutes);


export const IndexRoutes = router;
