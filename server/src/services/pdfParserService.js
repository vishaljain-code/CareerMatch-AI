import { PDFParse } from 'pdf-parse';

/**
 * Extracts and cleans text from a PDF buffer.
 * Rejects corrupt, password-protected, empty, or scanned (image-only) PDFs.
 *
 * @param {Buffer} buffer - Raw file buffer of the uploaded PDF
 * @returns {Promise<{ text: string, totalPages: number, charCount: number }>}
 */
export async function extractTextFromPDF(buffer) {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new Error('Invalid file buffer provided for PDF parsing.');
  }

  // Validate PDF magic bytes: '%PDF-' is hex 25 50 44 46 2d
  const header = buffer.subarray(0, 5).toString('ascii');
  if (!header.startsWith('%PDF-')) {
    throw new Error('Invalid file format: The uploaded file is not a valid PDF document.');
  }

  let parser = null;
  try {
    parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    const rawText = result && typeof result.text === 'string' ? result.text : '';
    const totalPages = result && result.total ? result.total : 1;

    // Clean up whitespace, carriage returns, null bytes, and non-printable chars
    const cleanedText = rawText
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\u0000/g, '') // remove null bytes
      .replace(/[^\x20-\x7E\t\n\u00A0-\uFFFF]/g, ' ') // retain standard unicode printable text
      .replace(/[ \t]+/g, ' ') // collapse horizontal spaces
      .replace(/\n{3,}/g, '\n\n') // collapse multiple blank lines
      .trim();

    if (!cleanedText || cleanedText.length < 50) {
      throw new Error(
        'Unable to extract readable text from this PDF. It appears to be a scanned document (image-only), empty, or flattened. CareerMatch AI requires a text-based PDF (OCR is not supported).'
      );
    }

    return {
      text: cleanedText,
      totalPages,
      charCount: cleanedText.length,
    };
  } catch (error) {
    // If it's already our friendly message, rethrow directly
    if (error.message.includes('scanned document') || error.message.includes('Invalid file format')) {
      throw error;
    }

    // Handle password protected or corrupted PDFs
    if (error.name === 'PasswordException' || /password/i.test(error.message)) {
      throw new Error('This PDF is password-protected. Please upload an unprotected PDF.');
    }

    throw new Error(
      `Failed to process the PDF: ${error.message || 'The file may be corrupted or unreadable.'}`
    );
  } finally {
    if (parser && typeof parser.destroy === 'function') {
      try {
        await parser.destroy();
      } catch {
        // cleanup ignore
      }
    }
  }
}
