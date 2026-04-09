import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { CommentService } from "./comment.service";

const createComment = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const payload = {
    ...req.body,
    userId: user.userId,
  };

  const result = await CommentService.createComment(payload);

  sendResponse(res, {
    httpStatusCode: 201,
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});

const getCommentsByReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const result = await CommentService.getCommentsByReview(reviewId as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Comments fetched successfully",
    data: result,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CommentService.updateComment(id as string, req.body);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CommentService.deleteComment(id as string);

  sendResponse(res, {
    httpStatusCode: 200,
    success: true,
    message: "Comment deleted successfully",
    data: result,
  });
});

export const CommentController = {
  createComment,
  getCommentsByReview,
  updateComment,
  deleteComment,
};
