import { Request, Response, NextFunction } from 'express';
import type { IVisionService } from '../services/vision.service';
import type { IMimeValidator } from '../services/mime.service';

export const makeAnalyzeController = (vision: IVisionService, mime: IMimeValidator) => async (
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

    const ok = await mime.isAllowed(file.buffer);
    if (!ok) {
      const err: any = new Error('Only image files are allowed');
      err.status = 400; err.publicMessage = 'Only image files are allowed';
      throw err;
    }

    const tags = await vision.getTagsFromImage(file.buffer);
    res.json({ tags });
  } catch (e) {
    next(e);
  }
};
