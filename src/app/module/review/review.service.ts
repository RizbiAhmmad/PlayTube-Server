import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { reviewSearchableFields } from "./review.constant";

const createReview = async (payload: any): Promise<Review> => {
  const result = await prisma.review.create({
    data: payload,
    include: {
      user: true,
      media: true,
    },
  });
  return result;
};

const getAllReviews = async (query: Record<string, any>) => {
  const reviewQuery = new QueryBuilder(prisma.review, query, {
    searchableFields: reviewSearchableFields,
  })
    .search()
    .filter()
    .sort()
    .paginate()
    .include({
      user: { select: { id: true, name: true, email: true } },
      media: { select: { id: true, title: true, thumbnail: true, type: true } },
    })
    .fields();

  const result = await reviewQuery.execute();
  return result;
};

const getReviewById = async (id: string): Promise<Review | null> => {
  const result = await prisma.review.findUnique({
    where: { id },
    include: {
      user: true,
      media: true,
    },
  });
  return result;
};

const updateReview = async (
  id: string,
  payload: Partial<Review>,
): Promise<Review> => {
  const result = await prisma.review.update({
    where: { id },
    data: payload,
  });
  return result;
};

const getMyReviews = async (userId: string) => {
  const result = await prisma.review.findMany({
    where: { userId },
    include: {
      media: {
        select: { id: true, title: true, thumbnail: true, type: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const getReviewsByMedia = async (mediaId: string) => {
  const result = await prisma.review.findMany({
    where: { mediaId, status: "APPROVED" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      _count: { select: { likes: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return result;
};

const deleteReview = async (id: string, userId?: string): Promise<Review> => {
  if (userId) {
    // Users can only delete their own PENDING reviews
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) throw new Error("Review not found");
    if (review.userId !== userId) throw new Error("Not authorized");
    if (review.status === "APPROVED") throw new Error("Cannot delete an approved review");
  }
  const result = await prisma.review.delete({ where: { id } });
  return result;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getReviewById,
  getMyReviews,
  getReviewsByMedia,
  updateReview,
  deleteReview,
};
