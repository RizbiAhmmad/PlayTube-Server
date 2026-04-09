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
    .fields();

  const result = await mediaQuery.execute();
  return result;
};

const getMediaById = async (id: string): Promise<Media | null> => {
  const media = await prisma.media.findUnique({
    where: { id },
  });
  return media;
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
