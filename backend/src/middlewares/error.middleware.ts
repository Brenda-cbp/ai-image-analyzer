import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // multer file size error code = 'LIMIT_FILE_SIZE'
  const isMulterLimit = err?.code === 'LIMIT_FILE_SIZE';
  const status = err.status || (isMulterLimit ? 413 : 500);
  const publicMessage =
    err.publicMessage ||
    (isMulterLimit ? 'File too large' : (err.message?.includes('Only image files') ? 'Only image files are allowed' : 'Internal Server Error'));

  res.status(status).json({
    error: { message: publicMessage }
  });
}
