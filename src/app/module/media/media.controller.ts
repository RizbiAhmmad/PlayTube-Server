import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { MediaService } from "./media.service";

const createMedia = catchAsync(async (req: Request, res: Response) => {
    const payload = {
        ...req.body,
        thumbnail: req.file?.path
    };
    
    const result = await MediaService.createMedia(payload);
    
    sendResponse(res, {
        httpStatusCode: 201,
        success: true,
        message: 'Media created successfully',
        data: result
    });
});

const getAllMedia = catchAsync(async (req: Request, res: Response) => {
    const result = await MediaService.getAllMedia();
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: 'Media fetched successfully',
        data: result
    });
});

const getMediaById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MediaService.getMediaById(id as string);
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: 'Media fetched successfully',
        data: result
    });
});

const updateMedia = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.file?.path ? { ...req.body, thumbnail: req.file.path } : req.body;
    
    const result = await MediaService.updateMedia(id as string, payload);
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: 'Media updated successfully',
        data: result
    });
});

const deleteMedia = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MediaService.deleteMedia(id as string);
    sendResponse(res, {
        httpStatusCode: 200,
        success: true,
        message: 'Media deleted successfully',
        data: result
    });
});

export const MediaController = {
    createMedia,
    getAllMedia,
    getMediaById,
    updateMedia,
    deleteMedia
};
