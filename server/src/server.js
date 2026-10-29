import app from './app.js';
import { config } from './config/env.js';

const server = app.listen(config.port, () => {
  console.log('====================================================');
  console.log(`🚀 CareerMatch AI Server running on port ${config.port}`);
  console.log(`📡 Health Check: http://localhost:${config.port}/api/health`);
  console.log(`🤖 AI Provider: Google Gemini (${config.geminiModel})`);
  console.log(
    `🔑 API Key Status: ${config.geminiApiKey ? 'CONFIGURED ✅' : 'NOT CONFIGURED ⚠️ (Add GEMINI_API_KEY to server/.env)'}`
  );
  console.log('====================================================');
});

// Handle unhandled rejections gracefully
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
