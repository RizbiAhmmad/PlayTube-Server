import { Media } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedia = async (payload: any): Promise<Media> => {
    const media = await prisma.media.create({
        data: payload
    });
    return media;
};

const getAllMedia = async (): Promise<Media[]> => {
    const mediaList = await prisma.media.findMany();
    return mediaList;
};

const getMediaById = async (id: string): Promise<Media | null> => {
    const media = await prisma.media.findUnique({
        where: { id }
    });
    return media;
};

const updateMedia = async (id: string, payload: Partial<Media>): Promise<Media> => {
    const media = await prisma.media.update({
        where: { id },
        data: payload
    });
    return media;
};

const deleteMedia = async (id: string): Promise<Media> => {
    const media = await prisma.media.delete({
        where: { id }
    });
    return media;
};

export const MediaService = {
    createMedia,
    getAllMedia,
    getMediaById,
    updateMedia,
    deleteMedia
};
