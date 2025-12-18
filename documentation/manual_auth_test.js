const http = require('http');

// Configuration
const PORT = 3000; // Adjust if your server runs on a different port
const API_URL = `http://localhost:${PORT}/api`;

// Utilities for making HTTP requests
function request(method, path, body = null, token = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: PORT,
            path: '/api' + path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = data ? JSON.parse(data) : {};
                    resolve({ status: res.statusCode, data: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, data: data });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runTest() {
    console.log('🚀 Starting Authentication Flow Test...\n');

    // 1. Signup
    const uniqueId = Date.now();
    const newUser = {
        user_name: `TestUser_${uniqueId}`,
        email: `test_${uniqueId}@example.com`,
        phone: `050${uniqueId.toString().slice(-7)}`, // Dummy phone
        password: 'password123',
        user_type: 'customer'
    };

    console.log(`1️⃣  Registering new user: ${newUser.email}`);
    const signupRes = await request('POST', '/auth/signup', newUser);

    if (signupRes.status !== 201) {
        console.error('❌ Signup Failed:', signupRes.data);
        return;
    }

    const token = signupRes.data.token;
    console.log('✅ Signup Successful. Token received.');
    console.log('   Token:', token.substring(0, 20) + '...');

    // 2. Access Protected Route (Before Logout)
    console.log('\n2️⃣  Accessing Protected Route (/auth/me)...');
    const meRes = await request('GET', '/auth/me', null, token);

    if (meRes.status === 200) {
        console.log('✅ Access Granted. User ID:', meRes.data.user_id);
    } else {
        console.error('❌ Access Denied:', meRes.data);
        return;
    }

    // 3. Logout
    console.log('\n3️⃣  Logging out...');
    const logoutRes = await request('POST', '/auth/logout', {}, token);

    if (logoutRes.status === 200) {
        console.log('✅ Logout Request Successful.');
    } else {
        console.error('❌ Logout Request Failed:', logoutRes.data);
    }

    // 4. Access Protected Route (After Logout)
    console.log('\n4️⃣  Accessing Protected Route (/auth/me) AFTER Logout...');
    const meAfterLogout = await request('GET', '/auth/me', null, token);

    if (meAfterLogout.status === 401 || meAfterLogout.status === 403) {
        console.log('✅ Access Denied as expected. (Status:', meAfterLogout.status, ')');
        console.log('   Message:', meAfterLogout.data.message);
    } else {
        console.error('❌ Access WAS NOT Denied! (Status:', meAfterLogout.status, ')');
        console.error('   This implies the token is still valid on the server.');
    }

    console.log('\n🏁 Test Complete.');
}

runTest();
