import { prisma } from "../../lib/prisma";

const toggleLike = async (userId: string, reviewId: string) => {
  const isExist = await prisma.like.findFirst({
    where: {
      userId,
      reviewId,
    },
  });

  if (isExist) {
    // Unlike logic
    await prisma.like.delete({
      where: {
        id: isExist.id,
      },
    });
    return { message: "Unliked successfully" };
  } else {
    // Like logic
    const result = await prisma.like.create({
      data: {
        userId,
        reviewId,
      },
    });
    return { message: "Liked successfully", data: result };
  }
};

const getLikesByReview = async (reviewId: string) => {
  const result = await prisma.like.findMany({
    where: {
      reviewId,
    },
    include: {
      user: true,
    },
  });
  return result;
};

export const LikeService = {
  toggleLike,
  getLikesByReview,
};
