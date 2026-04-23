import { Media } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { mediaSearchableFields } from "./media.constant";

const createMedia = async (payload: any): Promise<Media> => {
  const media = await prisma.media.create({
    data: payload,
  });
  return media;
};

const getAllMedia = async (query: Record<string, any>) => {
  const mediaQuery = new QueryBuilder(prisma.media, query, {
    searchableFields: mediaSearchableFields,
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .include({
      reviews: {
        where: { status: "APPROVED" },
        select: { rating: true },
      },
    })
    .fields();

  const result = await mediaQuery.execute();

  // Add averageRating and reviewCount to each media item
  const data = (result.data as any[]).map((media) => {
    const reviews = media.reviews || [];
    const totalRating = reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0.0";
    
    return {
      ...media,
      averageRating: parseFloat(averageRating as string),
      reviewCount: reviews.length,
    };
  });

  return {
    meta: result.meta,
    data,
  };
};

const getMediaById = async (id: string) => {
  const media = await prisma.media.findUnique({
    where: { id },
    include: {
      reviews: {
        where: { status: "APPROVED" },
        select: { rating: true },
      },
    },
  });

  if (!media) return null;

  const reviews = (media as any).reviews || [];
  const totalRating = reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0.0";

  return {
    ...media,
    averageRating: parseFloat(averageRating as string),
    reviewCount: reviews.length,
  };
};

const updateMedia = async (
  id: string,
  payload: Partial<Media>,
): Promise<Media> => {
  const media = await prisma.media.update({
    where: { id },
    data: payload,
  });
  return media;
};

const deleteMedia = async (id: string): Promise<Media> => {
  const media = await prisma.media.delete({
    where: { id },
  });
  return media;
};

export const MediaService = {
  createMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
};
