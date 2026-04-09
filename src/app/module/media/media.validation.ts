import { z } from "zod";

const createMediaZodSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    type: z.enum(["MOVIE", "SERIES"]),
    releaseYear: z.preprocess((val) => Number(val), z.number().int()),
    director: z.string().min(1, "Director is required"),
    cast: z.preprocess(
        (val) => (typeof val === "string" ? JSON.parse(val) : val),
        z.array(z.string()).min(1, "Cast is required")
      ),
    genres: z.preprocess(
        (val) => (typeof val === "string" ? JSON.parse(val) : val),
        z.array(z.string()).min(1, "Genres are required")
    ),
    trailerUrl: z.string().optional(),
    streamingUrl: z.string().min(1, "Streaming URL is required"),
    pricingType: z.enum(["FREE", "PREMIUM"]).default("FREE"),
    price: z.preprocess((val) => (val ? Number(val) : undefined), z.number().optional())
});

const updateMediaZodSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(["MOVIE", "SERIES"]).optional(),
    releaseYear: z.preprocess((val) => val !== undefined ? Number(val) : val, z.number().optional()),
    director: z.string().optional(),
    cast: z.preprocess(
        (val) => (typeof val === "string" ? JSON.parse(val) : val),
        z.array(z.string()).optional()
      ),
    genres: z.preprocess(
        (val) => (typeof val === "string" ? JSON.parse(val) : val),
        z.array(z.string()).optional()
    ),
    trailerUrl: z.string().optional(),
    streamingUrl: z.string().optional(),
    pricingType: z.enum(["FREE", "PREMIUM"]).optional(),
    price: z.preprocess((val) => val !== undefined ? Number(val) : val, z.number().optional())
});

export const MediaValidation = {
    createMediaZodSchema,
    updateMediaZodSchema
};
