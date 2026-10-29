import { improveBulletPoint } from '../services/aiService.js';

export async function handleImproveBullet(req, res, next) {
  try {
    const { originalBullet, targetRole, jobDescriptionSnippet, improvementType } = req.body;

    if (!originalBullet || typeof originalBullet !== 'string' || originalBullet.trim().length < 8) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_BULLET',
          message: 'Please provide a valid resume bullet point (at least 8 characters).',
        },
      });
    }

    if (originalBullet.length > 1000) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'BULLET_TOO_LONG',
          message: 'Bullet point must be under 1,000 characters.',
        },
      });
    }

    const validTypes = ['concise', 'action-verbs', 'skills-emphasis', 'job-alignment'];
    const chosenType = validTypes.includes(improvementType) ? improvementType : 'action-verbs';

    const result = await improveBulletPoint({
      originalBullet: originalBullet.trim(),
      targetRole: (targetRole || '').trim().slice(0, 100),
      jobDescriptionSnippet: (jobDescriptionSnippet || '').trim().slice(0, 1500),
      improvementType: chosenType,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
