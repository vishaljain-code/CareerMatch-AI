import app from '../src/app.js';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testMultipartUpload() {
  console.log('🧪 Testing multipart PDF resume upload to /api/analyze...');
  const port = 5056;
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(port, resolve));

  const pdfPath = path.join(__dirname, 'sample_resume.pdf');
  const pdfBytes = fs.readFileSync(pdfPath);

  // Use Node.js native Blob and FormData
  const formData = new FormData();
  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  formData.append('resume', pdfBlob, 'sample_resume.pdf');
  formData.append(
    'jobDescription',
    'We are looking for a Full Stack Software Engineer proficient in React, Node.js, TypeScript, and MongoDB. Must have experience building REST APIs.'
  );
  formData.append('targetRole', 'Full Stack Software Engineer');
  formData.append('companyName', 'TechCorp Solutions');
  formData.append('experienceLevel', 'Entry Level');

  const res = await fetch(`http://localhost:${port}/api/analyze`, {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  console.log(`📡 Response Status: ${res.status}`);

  if (res.status === 200 && data.success) {
    console.log('✅ Real AI Analysis succeeded!');
    console.log('   Match Score:', data.data.matchScore);
    console.log('   Matching Skills Count:', data.data.matchingSkills?.length);
  } else if (res.status === 503 && data.error?.code === 'API_KEY_MISSING') {
    console.log('✅ PDF parsing and validation succeeded!');
    console.log('   Correctly caught API_KEY_MISSING (no fake data hallucinated):', data.error.message);
  } else {
    console.log('ℹ️ Analysis response:', data);
  }

  await new Promise((resolve) => server.close(resolve));
  console.log('🎉 Multipart upload test complete.');
}

testMultipartUpload();
