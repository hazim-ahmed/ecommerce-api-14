const http = require('http');

// Helper function to make HTTP requests
function makeRequest(path, method, data) {
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

async function runTests() {
    const results = [];

    console.log("Starting Validation Tests...");

    // Test 1: Create User - Missing Fields (Validation Error)
    console.log("Test 1: Create User - Missing Fields");
    try {
        const res = await makeRequest('/users', 'POST', {
            user_name: "Test User"
            // Missing phone, password, type
        });
        results.push({
            id: 1,
            title: "Create User - Missing Fields",
            input: { user_name: "Test User" },
            status: res.status,
            response: res.body,
            pass: res.status === 400 && res.body.message === "Validation Error"
        });
    } catch (e) {
        console.error("Test 1 Failed", e);
    }

    // Test 2: Create User - Valid Data
    console.log("Test 2: Create User - Valid Data");
    let userId = null;
    try {
        const uniquePhone = "050" + Math.floor(1000000 + Math.random() * 9000000);
        const uniqueEmail = `test${Math.floor(Math.random() * 10000)}@test.com`;

        const res = await makeRequest('/users', 'POST', {
            user_name: "Valid User",
            phone: uniquePhone,
            email: uniqueEmail,
            password: "password123",
            user_type: "vendor"
        });

        if (res.status === 201) {
            userId = res.body.user.user_id;
        }

        results.push({
            id: 2,
            title: "Create User - Valid Data",
            input: { user_name: "Valid User", phone: uniquePhone, email: uniqueEmail, user_type: "vendor" },
            status: res.status,
            response: res.body,
            pass: res.status === 201
        });
    } catch (e) {
        console.error("Test 2 Failed", e);
    }

    // Test 3: Create Store - Invalid Vendor ID (Relationship Error)
    console.log("Test 3: Create Store - Invalid Vendor ID");
    try {
        const res = await makeRequest('/stores', 'POST', {
            vendor_id: 999999, // Non-existent
            city_id: 1,
            store_category_id: 1,
            store_name: "Test Store",
            store_lat: 24.0,
            store_lng: 45.0
        });
        results.push({
            id: 3,
            title: "Create Store - Invalid Vendor ID",
            input: { vendor_id: 999999, store_name: "Test Store" },
            status: res.status,
            response: res.body,
            pass: res.status === 400 && JSON.stringify(res.body).includes("Vendor (User) not found")
        });
    } catch (e) {
        console.error("Test 3 Failed", e);
    }

    // Test 4: Create Product - Invalid Store ID (Relationship Error)
    console.log("Test 4: Create Product - Invalid Store ID");
    try {
        const res = await makeRequest('/products', 'POST', {
            store_id: 88888, // Non-existent
            product_category_id: 1,
            product_name: "Test Product",
            product_price: 100
        });
        results.push({
            id: 4,
            title: "Create Product - Invalid Store ID",
            input: { store_id: 88888, product_name: "Test Product" },
            status: res.status,
            response: res.body,
            pass: res.status === 400 && JSON.stringify(res.body).includes("Store not found")
        });
    } catch (e) {
        console.error("Test 4 Failed", e);
    }

    // Print Results JSON for capture
    console.log("JSON_OUTPUT_START");
    console.log(JSON.stringify(results, null, 2));
    console.log("JSON_OUTPUT_END");
}

runTests();
