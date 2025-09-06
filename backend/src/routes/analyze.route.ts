import { Router } from 'express';
import { makeAnalyzeController } from '../controllers/analyze.controller';
import { MockVisionService, GoogleVisionService } from '../services/vision.service';
import { config } from '../utils/config';
import { upload } from '../middlewares/upload.middleware';

const router = Router();
const visionService = config.useGoogleVision
  ? new GoogleVisionService()
  : new MockVisionService();

router.post('/analyze', upload.single('image'), makeAnalyzeController(visionService));

export default router;
