const axios = require('axios');

async function testBackend() {
  try {
    console.log('Testing backend connectivity...');
    
    // Test health endpoint
    const healthResponse = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Backend is running:', healthResponse.data);
    
    // Test users endpoint
    const usersResponse = await axios.get('http://localhost:5000/api/users');
    console.log('✅ Users endpoint working:', usersResponse.data.data.users.length, 'users found');
    
    console.log('🎉 Backend is working correctly!');
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the backend is running on port 5000');
      console.log('   Run: cd backend && npm run dev');
    }
  }
}

testBackend(); 