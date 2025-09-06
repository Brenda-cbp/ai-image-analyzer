import { Router } from 'express';
import { makeAnalyzeController } from '../controllers/analyze.controller';
import { MockVisionService, GoogleVisionService } from '../services/vision.service';
import { config } from '../utils/config';

const router = Router();
const visionService = config.useGoogleVision
  ? new GoogleVisionService()
  : new MockVisionService();

router.post('/analyze', makeAnalyzeController(visionService));

export default router;
