import { Request, Response, NextFunction } from 'express';
import type { IVisionService } from '../services/vision.service';

export const makeAnalyzeController = (vision: IVisionService) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) {
      const err: any = new Error('No image provided');
      err.status = 400; err.publicMessage = 'No image provided';
      throw err;
    }
    const tags = await vision.getTagsFromImage(file.buffer);
    res.json({ tags });
  } catch (e) {
    next(e);
  }
};

