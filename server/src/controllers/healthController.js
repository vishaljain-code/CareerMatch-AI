import { config } from '../config/env.js';

export function getHealth(req, res) {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    aiConfigured: Boolean(config.geminiApiKey && config.geminiApiKey.trim().length > 0),
    model: config.geminiModel,
    version: '1.0.0',
    service: 'CareerMatch AI Backend Engine',
  });
}
