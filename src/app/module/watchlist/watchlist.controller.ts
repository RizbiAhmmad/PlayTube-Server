import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { WatchlistService } from "./watchlist.service";

const addToWatchlist = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { mediaId } = req.body;

  const result = await WatchlistService.addToWatchlist(user.userId, mediaId);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Media added to watchlist successfully",
    data: result,
  });
});

const getMyWatchlist = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;

  const result = await WatchlistService.getWatchlistByUser(user.userId);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Watchlist fetched successfully",
    data: result,
  });
});

const removeFromWatchlist = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { mediaId } = req.params;

  const result = await WatchlistService.removeFromWatchlist(user.userId, mediaId as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Media removed from watchlist successfully",
    data: result,
  });
});

export const WatchlistController = {
  addToWatchlist,
  getMyWatchlist,
  removeFromWatchlist,
};
