import { Request, Response, NextFunction } from 'express';
import type { IVisionService } from '../services/vision.service';

export const makeAnalyzeController = (vision: IVisionService) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // trabajo con base64 oara simplificar
    const base64 = req.body?.imageBase64;
    if (!base64) {
      const err: any = new Error('No image provided');
      err.status = 400; err.publicMessage = 'No image provided';
      throw err;
    }
    const buffer = Buffer.from(base64, 'base64');
    const tags = await vision.getTagsFromImage(buffer);
    res.json({ tags });
  } catch (e) {
    next(e);
  }
};
