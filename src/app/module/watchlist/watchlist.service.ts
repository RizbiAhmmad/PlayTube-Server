import { prisma } from "../../lib/prisma";

const addToWatchlist = async (userId: string, mediaId: string) => {
  const result = await prisma.watchlist.create({
    data: {
      userId,
      mediaId,
    },
    include: {
      media: true,
    },
  });
  return result;
};

const getWatchlistByUser = async (userId: string) => {
  const result = await prisma.watchlist.findMany({
    where: {
      userId,
    },
    include: {
      media: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const removeFromWatchlist = async (userId: string, mediaId: string) => {
  const result = await prisma.watchlist.delete({
    where: {
      userId_mediaId: {
        userId,
        mediaId,
      },
    },
  });
  return result;
};

export const WatchlistService = {
  addToWatchlist,
  getWatchlistByUser,
  removeFromWatchlist,
};
