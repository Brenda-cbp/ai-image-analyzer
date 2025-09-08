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

    // MIME validation
    const { fileTypeFromBuffer } = await import('file-type');
    const type = await fileTypeFromBuffer(file.buffer);
    const allowed = ['image/png', 'image/jpeg', 'image/webp','image/jpg' ];
    if (!type || !allowed.includes(type.mime)) {
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
