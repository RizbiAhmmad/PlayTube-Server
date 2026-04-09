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

const deleteReview = async (id: string): Promise<Review> => {
  const result = await prisma.review.delete({
    where: { id },
  });
  return result;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
