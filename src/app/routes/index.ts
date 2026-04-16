import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.router";
import { AdminRoutes } from "../module/admin/admin.route";
import { MediaRoutes } from "../module/media/media.routes";
import { ReviewRoutes } from "../module/review/review.routes";
import { WatchlistRoutes } from "../module/watchlist/watchlist.routes";
import { LikeRoutes } from "../module/like/like.routes";
import { CommentRoutes } from "../module/comment/comment.routes";
import { PaymentRoutes } from "../module/payment/payment.route";
import { StatsRoutes } from "../module/stats/stats.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/admins", AdminRoutes);
router.use("/media", MediaRoutes);
router.use("/reviews", ReviewRoutes);
router.use("/watchlist", WatchlistRoutes);
router.use("/likes", LikeRoutes);
router.use("/comments", CommentRoutes);
router.use("/payments", PaymentRoutes);
router.use("/stats", StatsRoutes);

export const IndexRoutes = router;
