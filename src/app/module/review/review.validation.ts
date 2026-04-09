import { z } from "zod";
import { ReviewStatus } from "../../../generated/prisma/enums";

const createReviewZodSchema = z.object({
  rating: z.number().int().min(1).max(10),
  content: z.string().min(1, "Review content is required"),
  spoiler: z.boolean().default(false).optional(),
  tags: z.array(z.string()).default([]).optional(),
  mediaId: z.string().min(1, "Media ID is required"),
});


const updateReviewZodSchema = z.object({
  rating: z.number().int().min(1).max(10).optional(),
  content: z.string().optional(),
  spoiler: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  status: z.nativeEnum(ReviewStatus).optional(),
});

export const ReviewValidation = {
  createReviewZodSchema,
  updateReviewZodSchema,
};
