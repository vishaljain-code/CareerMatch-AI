import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';
import { handleResumeAnalysis } from '../controllers/analyzeController.js';
import { handleImproveBullet } from '../controllers/bulletController.js';
import { uploadResume } from '../middleware/upload.js';
import { apiRateLimiter, bulletRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Health check endpoint
router.get('/health', getHealth);

// Analyze resume endpoint (upload PDF + metadata + job description)
router.post('/analyze', apiRateLimiter, uploadResume.single('resume'), handleResumeAnalysis);

// Bullet improvement assistant endpoint
router.post('/improve-bullet', bulletRateLimiter, handleImproveBullet);

export default router;
