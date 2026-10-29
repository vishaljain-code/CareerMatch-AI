import multer from 'multer';
import { config } from '../config/env.js';

export function errorHandler(err, req, res, next) {
  // Handle Multer upload errors
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        error: {
          code: 'FILE_TOO_LARGE',
          message: `The uploaded PDF exceeds the ${config.maxFileSizeMb}MB size limit. Please upload a smaller resume file.`,
        },
      });
    }
    return res.status(400).json({
      success: false,
      error: {
        code: 'UPLOAD_ERROR',
        message: `File upload error: ${err.message}`,
      },
    });
  }

  // Handle custom file filter error
  if (err.code === 'INVALID_FILE_TYPE') {
    return res.status(400).json({
      success: false,
      error: {
        code: 'INVALID_FILE_TYPE',
        message: err.message,
      },
    });
  }

  // Handle Missing or Invalid API Key
  if (err.code === 'API_KEY_MISSING') {
    return res.status(503).json({
      success: false,
      error: {
        code: 'API_KEY_MISSING',
        message: err.message,
        hint: 'Create a .env file inside the /server directory containing: GEMINI_API_KEY=your_key_here',
      },
    });
  }

  if (err.code === 'INVALID_API_KEY') {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_API_KEY',
        message: err.message,
      },
    });
  }

  if (err.code === 'RATE_LIMIT_EXCEEDED') {
    return res.status(429).json({
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: err.message,
      },
    });
  }

  const statusCode = err.status || err.statusCode || 500;
  const clientMessage =
    statusCode === 500 && config.nodeEnv === 'production'
      ? 'An unexpected error occurred while processing your request. Please try again.'
      : err.message || 'Internal server error';

  return res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'SERVER_ERROR',
      message: clientMessage,
    },
  });
}
