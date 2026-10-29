import { extractTextFromPDF } from '../services/pdfParserService.js';
import { analyzeResume } from '../services/aiService.js';

export async function handleResumeAnalysis(req, res, next) {
  try {
    // 1. Validate file presence
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'NO_FILE_UPLOADED',
          message: 'Please upload a resume in PDF format.',
        },
      });
    }

    // 2. Validate job description input
    const { jobDescription, targetRole, companyName, experienceLevel } = req.body;

    if (!jobDescription || typeof jobDescription !== 'string' || jobDescription.trim().length < 30) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_JOB_DESCRIPTION',
          message:
            'Please provide a complete job description (at least 30 characters) for accurate matching.',
        },
      });
    }

    if (jobDescription.length > 25000) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'JOB_DESCRIPTION_TOO_LONG',
          message: 'The job description is too long (maximum 25,000 characters). Please provide the main requirements.',
        },
      });
    }

    // 3. Extract text from PDF buffer
    const { text: resumeText, totalPages, charCount } = await extractTextFromPDF(req.file.buffer);

    // 4. Invoke AI analysis
    const analysis = await analyzeResume({
      resumeText,
      jobDescription: jobDescription.trim(),
      targetRole: (targetRole || '').trim().slice(0, 100),
      experienceLevel: (experienceLevel || 'Auto').trim().slice(0, 50),
    });

    // 5. Build response with metadata
    return res.status(200).json({
      success: true,
      data: {
        ...analysis,
        metadata: {
          filename: req.file.originalname,
          fileSizeBytes: req.file.size,
          resumePages: totalPages,
          resumeCharCount: charCount,
          targetRole: targetRole?.trim() || analysis.targetRoleIdentified || 'Target Role',
          companyName: companyName?.trim() || null,
          experienceLevel: experienceLevel?.trim() || 'Not specified',
          analyzedAt: new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    next(error);
  }
}
