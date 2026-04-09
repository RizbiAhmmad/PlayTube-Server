import { z } from "zod";

const toggleLikeZodSchema = z.object({
  reviewId: z.string().min(1, "Review ID is required"),
});


export const LikeValidation = {
  toggleLikeZodSchema,
};
