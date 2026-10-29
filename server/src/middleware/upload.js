import multer from 'multer';
import { config } from '../config/env.js';

// Use memory storage to avoid uncleaned disk artifacts and protect user privacy
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check extension and mime type
  const isPdfExtension = file.originalname.toLowerCase().endsWith('.pdf');
  const isPdfMime = file.mimetype === 'application/pdf' || file.mimetype === 'application/x-pdf';

  if (isPdfExtension && isPdfMime) {
    cb(null, true);
  } else {
    const error = new Error('Only PDF resume files (.pdf) are accepted.');
    error.code = 'INVALID_FILE_TYPE';
    cb(error, false);
  }
};

export const uploadResume = multer({
  storage,
  limits: {
    fileSize: config.maxFileSizeMb * 1024 * 1024, // 5MB default
    files: 1,
  },
  fileFilter,
});
