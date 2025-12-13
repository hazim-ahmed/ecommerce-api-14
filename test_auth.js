const http = require('http');

function makeRequest(path, method, data, token) {
    return new Promise((resolve, reject) => {
        const dataString = JSON.stringify(data || {});

        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/api' + path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data ? Buffer.byteLength(dataString) : 0
            }
        };

        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, body: body ? JSON.parse(body) : {} });
                } catch (e) {
                    resolve({ status: res.statusCode, body: body });
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (data) {
            req.write(dataString);
        }
        req.end();
    });
}

async function runAuthTests() {
    console.log("Starting Auth Tests...");

    // 1. Signup
    const uniqueNum = Math.floor(Math.random() * 100000);
    const signupData = {
        user_name: `Auth User ${uniqueNum}`,
        email: `auth${uniqueNum}@test.com`,
        phone: `0555${uniqueNum}`,
        password: "password123",
        user_type: "customer"
    };

    console.log("\n1. Testing Signup...");
    let token = null;
    try {
        const res = await makeRequest('/auth/signup', 'POST', signupData);
        console.log("Status:", res.status);
        console.log("Response:", JSON.stringify(res.body, null, 2));

        if (res.status === 201) {
            token = res.body.token;
            console.log("✅ Signup Successful");
        } else {
            console.log("❌ Signup Failed");
        }
    } catch (e) {
        console.error("Error:", e);
    }

    // 2. Login
    console.log("\n2. Testing Login...");
    try {
        const loginData = {
            identifier: signupData.email,
            password: "password123"
        };
        const res = await makeRequest('/auth/login', 'POST', loginData);
        console.log("Status:", res.status);
        // console.log("Response:", res.body);

        if (res.status === 200 && res.body.token) {
            console.log("✅ Login Successful");
            if (!token) token = res.body.token;
        } else {
            console.log("❌ Login Failed");
        }
    } catch (e) {
        console.error("Error:", e);
    }

    // 3. Protected Route (Success)
    console.log("\n3. Testing Protected Route (With Token)...");
    if (token) {
        try {
            const res = await makeRequest('/auth/me', 'GET', null, token);
            console.log("Status:", res.status);
            console.log("Response:", JSON.stringify(res.body, null, 2));

            if (res.status === 200 && res.body.email === signupData.email) {
                console.log("✅ Protected Route Access Successful");
            } else {
                console.log("❌ Protected Route Access Failed");
            }
        } catch (e) {
            console.error("Error:", e);
        }
    } else {
        console.log("Skipping step 3 (no token)");
    }

    // 4. Protected Route (Fail)
    console.log("\n4. Testing Protected Route (Without Token)...");
    try {
        const res = await makeRequest('/auth/me', 'GET', null, null);
        console.log("Status:", res.status);

        if (res.status === 401) {
            console.log("✅ Access Denied Correctly");
        } else {
            console.log("❌ Access Not Denied (Status " + res.status + ")");
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

runAuthTests();
