import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { WatchlistController } from "./watchlist.controller";
import { WatchlistValidation } from "./watchlist.validation";

const router = Router();

router.post(
  "/",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(WatchlistValidation.createWatchlistZodSchema),
  WatchlistController.addToWatchlist,
);

router.get(
  "/my-watchlist",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  WatchlistController.getMyWatchlist,
);

router.delete(
  "/:mediaId",
  checkAuth(Role.USER, Role.ADMIN, Role.SUPER_ADMIN),
  WatchlistController.removeFromWatchlist,
);

export const WatchlistRoutes = router;
