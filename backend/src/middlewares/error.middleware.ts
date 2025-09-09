import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const isMulterLimit = err?.code === 'LIMIT_FILE_SIZE';
  const isOnlyImages = err?.message?.includes('Only image files');
  const isMalformedMultipart =
    err?.message?.includes('Unexpected end of form') ||
    err?.message?.includes('Unexpected end of multipart data');

  const status = err.status || (isMulterLimit ? 413 : isMalformedMultipart ? 400 : 500);
  const publicMessage =
    err.publicMessage ||
    (isMulterLimit
      ? 'File too large'
      : isOnlyImages
        ? 'Only image files are allowed'
        : isMalformedMultipart
          ? 'Malformed multipart form'
          : 'Internal Server Error');

  res.status(status).json({ error: { message: publicMessage } });
}
