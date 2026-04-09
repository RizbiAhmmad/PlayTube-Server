import { prisma } from "../../lib/prisma";

const createComment = async (payload: any) => {
  const result = await prisma.comment.create({
    data: payload,
    include: {
      user: true,
    },
  });
  return result;
};

const getCommentsByReview = async (reviewId: string) => {
  const result = await prisma.comment.findMany({
    where: {
      reviewId,
      parentId: null, // Only get top-level comments
    },
    include: {
      user: true,
      replies: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const updateComment = async (id: string, payload: any) => {
  const result = await prisma.comment.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deleteComment = async (id: string) => {
  const result = await prisma.comment.delete({
    where: { id },
  });
  return result;
};

export const CommentService = {
  createComment,
  getCommentsByReview,
  updateComment,
  deleteComment,
};
