import { extractTextFromPDF } from '../src/services/pdfParserService.js';

// Minimal valid PDF with text stream
const samplePdfRaw = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 180 >>
stream
BT
/F1 12 Tf
72 712 Td
(Alex Morgan - Full Stack Software Engineer) Tj
0 -20 Td
(Skills: React, Node.js, Express, TypeScript, MongoDB, Docker, REST APIs) Tj
0 -20 Td
(Experience: Built scalable frontend applications and cloud microservices.) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000234 00000 n 
0000000465 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
548
%%EOF`;

async function runTests() {
  console.log('🧪 Starting CareerMatch AI backend unit tests...');

  // Test 1: Extract text from valid PDF
  try {
    const buffer = Buffer.from(samplePdfRaw, 'utf-8');
    const result = await extractTextFromPDF(buffer);
    console.log('✅ Test 1 Passed: PDF text extracted successfully.');
    console.log(`   Chars: ${result.charCount}, Pages: ${result.totalPages}`);
    console.log(`   Sample text: "${result.text.slice(0, 60)}..."`);
  } catch (err) {
    console.error('❌ Test 1 Failed:', err.message);
  }

  // Test 2: Non-PDF buffer should reject
  try {
    const invalidBuffer = Buffer.from('This is a text file disguised as a pdf', 'utf-8');
    await extractTextFromPDF(invalidBuffer);
    console.error('❌ Test 2 Failed: Did not reject non-PDF header.');
  } catch (err) {
    console.log('✅ Test 2 Passed: Successfully rejected non-PDF buffer:', err.message);
  }

  // Test 3: Short text buffer should detect empty/scanned PDF
  try {
    const tinyPdf = Buffer.from('%PDF-1.4\nxref\n0 1\n0000000000 65535 f \ntrailer\n<</Size 1>>\nstartxref\n9\n%%EOF');
    await extractTextFromPDF(tinyPdf);
    console.error('❌ Test 3 Failed: Did not detect empty/unreadable PDF.');
  } catch (err) {
    console.log('✅ Test 3 Passed: Successfully rejected unreadable/empty PDF:', err.message);
  }

  console.log('🎉 All backend tests completed!');
}

runTests();
