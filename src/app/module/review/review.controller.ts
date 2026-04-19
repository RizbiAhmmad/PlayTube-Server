import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { ReviewService } from "./review.service";
import { IRequestUser } from "../../interfaces/requestUser";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user as IRequestUser;
  const payload = { ...req.body, userId: user.userId };
  const result = await ReviewService.createReview(payload);
  sendResponse(res, { httpStatusCode: 201, success: true, message: "Review submitted and awaiting approval", data: result });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.getAllReviews(req.query);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "Reviews fetched successfully", meta: result.meta, data: result.data });
});

const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.getReviewById(id as string);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "Review fetched successfully", data: result });
});

const getMyReviews = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as IRequestUser;
  const result = await ReviewService.getMyReviews(user.userId);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "My reviews fetched successfully", data: result });
});

const getReviewsByMedia = catchAsync(async (req: Request, res: Response) => {
  const { mediaId } = req.params;
  const result = await ReviewService.getReviewsByMedia(mediaId as string);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "Media reviews fetched successfully", data: result });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.updateReview(id as string, req.body);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "Review updated successfully", data: result });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as IRequestUser;
  // Admins/SuperAdmins can delete any review; users can only delete their own PENDING ones
  const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
  const result = await ReviewService.deleteReview(id as string, isAdmin ? undefined : user.userId);
  sendResponse(res, { httpStatusCode: 200, success: true, message: "Review deleted successfully", data: result });
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getReviewById,
  getMyReviews,
  getReviewsByMedia,
  updateReview,
  deleteReview,
};
