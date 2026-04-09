import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { LikeService } from "./like.service";

const toggleLike = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { reviewId } = req.body;

  const result = await LikeService.toggleLike(user.userId, reviewId);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: result.message,
    data: result.data || null,
  });
});

const getLikesByReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  const result = await LikeService.getLikesByReview(reviewId as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Likes fetched successfully",
    data: result,
  });
});

export const LikeController = {
  toggleLike,
  getLikesByReview,
};
