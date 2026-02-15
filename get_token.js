const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth/login';

async function getAdminToken() {
    try {
        const response = await axios.post(API_URL, {
            username: 'adminUser',
            password: 'adminPassword123'
        });
        console.log('\nCopy this token (without quotes):');
        console.log(response.data.token);
    } catch (error) {
        console.error('Error getting token:', error.response ? error.response.data : error.message);
    }
}

getAdminToken();
