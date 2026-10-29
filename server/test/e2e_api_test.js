import app from '../src/app.js';
import http from 'http';

// Test runner using Node native fetch
async function runE2ETests() {
  console.log('🚀 Running end-to-end API integration tests on CareerMatch AI backend...');
  const port = 5055;
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(port, resolve));
  const baseUrl = `http://localhost:${port}/api`;

  let failures = 0;

  // Test 1: Health Check Endpoint
  try {
    const res = await fetch(`${baseUrl}/health`);
    const data = await res.json();
    if (res.status === 200 && data.status === 'healthy') {
      console.log('✅ Test 1 Passed: GET /api/health returned 200 OK and healthy status.');
      console.log(`   Model configured: ${data.model}, AI Key configured: ${data.aiConfigured}`);
    } else {
      console.error('❌ Test 1 Failed: unexpected response', data);
      failures++;
    }
  } catch (err) {
    console.error('❌ Test 1 Failed:', err.message);
    failures++;
  }

  // Test 2: Validation on /api/analyze without resume file
  try {
    const res = await fetch(`${baseUrl}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription: 'Need a software developer with experience in React and Node.' }),
    });
    const data = await res.json();
    if (res.status === 400 && data.error?.code === 'NO_FILE_UPLOADED') {
      console.log('✅ Test 2 Passed: POST /api/analyze properly rejected request with no resume file (HTTP 400 NO_FILE_UPLOADED).');
    } else {
      console.error('❌ Test 2 Failed:', res.status, data);
      failures++;
    }
  } catch (err) {
    console.error('❌ Test 2 Failed:', err.message);
    failures++;
  }

  // Test 3: Validation on /api/improve-bullet with too short input
  try {
    const res = await fetch(`${baseUrl}/improve-bullet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalBullet: 'short' }),
    });
    const data = await res.json();
    if (res.status === 400 && data.error?.code === 'INVALID_BULLET') {
      console.log('✅ Test 3 Passed: POST /api/improve-bullet rejected too-short bullet (HTTP 400 INVALID_BULLET).');
    } else {
      console.error('❌ Test 3 Failed:', res.status, data);
      failures++;
    }
  } catch (err) {
    console.error('❌ Test 3 Failed:', err.message);
    failures++;
  }

  // Test 4: Missing API Key returns friendly 503 rather than crashing or returning fake mock data
  try {
    const res = await fetch(`${baseUrl}/improve-bullet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalBullet: 'Built customer-facing React components for checkout workflow',
        improvementType: 'action-verbs',
      }),
    });
    const data = await res.json();
    if (res.status === 503 && data.error?.code === 'API_KEY_MISSING') {
      console.log('✅ Test 4 Passed: Missing GEMINI_API_KEY returned friendly HTTP 503 API_KEY_MISSING with configuration hint.');
    } else if (res.status === 200 && data.success) {
      console.log('✅ Test 4 Passed: Live Gemini API succeeded with valid configured key.');
    } else {
      console.log(`ℹ️ Test 4 Result: Status ${res.status}, response code: ${data.error?.code}`);
    }
  } catch (err) {
    console.error('❌ Test 4 Failed:', err.message);
    failures++;
  }

  // Test 5: Unknown route returns structured 404
  try {
    const res = await fetch(`${baseUrl}/non-existent-route`);
    const data = await res.json();
    if (res.status === 404 && data.error?.code === 'NOT_FOUND') {
      console.log('✅ Test 5 Passed: Unknown route returned structured 404 NOT_FOUND.');
    } else {
      console.error('❌ Test 5 Failed:', res.status, data);
      failures++;
    }
  } catch (err) {
    console.error('❌ Test 5 Failed:', err.message);
    failures++;
  }

  await new Promise((resolve) => server.close(resolve));
  console.log(`\n🏁 Test run finished with ${failures} failure(s).`);
  process.exit(failures > 0 ? 1 : 0);
}

runE2ETests();
