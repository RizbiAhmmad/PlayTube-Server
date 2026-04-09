import { z } from "zod";

const createWatchlistZodSchema = z.object({
  mediaId: z.string().min(1, "Media ID is required"),
});


export const WatchlistValidation = {
  createWatchlistZodSchema,
};
