import { Router } from 'express';

import { makeAnalyzeController } from '../controllers/analyze.controller';
import { upload } from '../middlewares/upload.middleware';
import { FileTypeMimeValidator, HeuristicMimeValidator } from '../services/mime.service';
import { MockVisionService, GoogleVisionService } from '../services/vision.service';
import { config } from '../utils/config';

const router = Router();
// Vision: real o mock por flag
const visionService = config.useGoogleVision ? new GoogleVisionService() : new MockVisionService();

// MIME: en test se usa  heurístico (no ESM), en otros ambientes se usa file-type real
const isTest = process.env.NODE_ENV === 'test';
const mimeValidator = isTest ? new HeuristicMimeValidator() : new FileTypeMimeValidator();

router.post(
  '/analyze',
  upload.single('image'),
  makeAnalyzeController(visionService, mimeValidator),
);

export default router;
