import { z } from "zod";

const createCommentZodSchema = z.object({
  content: z.string().min(1, "Comment content is required"),
  reviewId: z.string().min(1, "Review ID is required"),
  parentId: z.string().optional(),
});

const updateCommentZodSchema = z.object({
  content: z.string().optional(),
});

export const CommentValidation = {
  createCommentZodSchema,
  updateCommentZodSchema,
};
