import { Router } from 'express';
import { makeAnalyzeController } from '../controllers/analyze.controller';
import { MockVisionService } from '../services/vision.service';

const router = Router();
const mockVision = new MockVisionService();

router.post('/analyze', makeAnalyzeController(mockVision));

export default router;
