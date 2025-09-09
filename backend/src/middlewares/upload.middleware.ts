import { extname } from 'node:path';

import multer from 'multer';

const storage = multer.memoryStorage();
const MB = Number(process.env.MAX_FILE_MB || 10);

export const upload = multer({
  storage,
  limits: { fileSize: MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
    const ok = allowed.includes(extname(file.originalname).toLowerCase());
    if (!ok) return cb(new Error('Only image files are allowed'));
    cb(null, true);
  },
});
