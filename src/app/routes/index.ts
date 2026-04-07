import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.router";
import { AdminRoutes } from "../module/admin/admin.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admins", AdminRoutes)

export const IndexRoutes = router;
