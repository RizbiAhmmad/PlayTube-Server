import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.router";
import { AdminRoutes } from "../module/admin/admin.route";
import { MediaRoutes } from "../module/media/media.routes";
import { ReviewRoutes } from "../module/review/review.routes";
import { WatchlistRoutes } from "../module/watchlist/watchlist.routes";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admins", AdminRoutes);
router.use("/media", MediaRoutes);
router.use("/reviews", ReviewRoutes);
router.use("/watchlist", WatchlistRoutes);



export const IndexRoutes = router;
