const http = require('http');

// Configuration
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}/api`;

// Helper for making HTTP requests
function request(method, path, data = null, token = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: PORT,
            path: '/api' + path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = body ? JSON.parse(body) : {};
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, body: body });
                }
            });
        });

        req.on('error', (e) => reject(e));

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function runTests() {
    console.log("=== Starting API Integration Tests ===\n");

    // 1. Register a new user to get a guaranteed Token
    const timestamp = Date.now();
    const newUser = {
        user_name: `Test User ${timestamp}`,
        email: `test${timestamp}@example.com`,
        phone: `05${timestamp.toString().substring(0, 8)}`,
        password: 'password123',
        user_type: 'customer'
    };

    console.log(`[1] Registering new user: ${newUser.email}...`);
    let authRes;
    try {
        authRes = await request('POST', '/auth/signup', newUser);
    } catch (e) {
        console.error("Failed to connect to server. Is it running on port 3000?");
        process.exit(1);
    }

    if (authRes.status !== 201 && authRes.status !== 200) {
        console.error("Registration failed:", authRes.body);
        // Try login if already exists (unlikely with timestamp)
        process.exit(1);
    }

    // Extract Token (Adjust based on your Auth response structure)
    // Assuming structure is { token: "...", user: ... } or { data: { token: ... } }
    const token = authRes.body.token || (authRes.body.data && authRes.body.data.token);

    if (!token) {
        console.error("Could not extract token from response:", authRes.body);
        // Try Login
        console.log("Trying Login...");
        const loginRes = await request('POST', '/auth/login', { email: newUser.email, password: newUser.password });
        if (loginRes.body.token) {
            // token = loginRes.body.token; 
            // ... logic
        } else {
            console.error("Login also failed to give token. Check Auth implementation.");
            process.exit(1);
        }
    }

    console.log("✅ User registered and Authenticated.\n");


    // 2. Test Private Routes (Orders) - Should return empty list (new user) or specific list
    console.log("[2] Testing GET /api/orders (Protected & Filtered)...");
    const orderRes = await request('GET', '/orders', null, token);
    if (orderRes.status === 200) {
        console.log(`✅ Success. Status: 200. My Orders Count: ${Array.isArray(orderRes.body) ? orderRes.body.length : 'Not an array'}`);
        // console.log("Response:", orderRes.body);
    } else {
        console.error("❌ Failed.", orderRes.status, orderRes.body);
    }

    // 3. Test Private Routes (Addresses)
    console.log("\n[3] Testing GET /api/addresses (Protected & Filtered)...");
    const addrRes = await request('GET', '/addresses', null, token);
    if (addrRes.status === 200) {
        console.log(`✅ Success. Status: 200. My Addresses Count: ${Array.isArray(addrRes.body) ? addrRes.body.length : 'Not an array'}`);
    } else {
        console.error("❌ Failed.", addrRes.status, addrRes.body);
    }

    // 4. Test Public Filters (Stores by Category)
    console.log("\n[4] Testing GET /api/stores?category_id=1 (Public Filter)...");
    // We assume some stores exist. Even if empty, status should be 200.
    const storeRes = await request('GET', '/stores?category_id=1');
    if (storeRes.status === 200) {
        console.log(`✅ Success. Status: 200. Stores in Category 1: ${Array.isArray(storeRes.body) ? storeRes.body.length : 'Not an array'}`);
    } else {
        console.error("❌ Failed.", storeRes.status, storeRes.body);
    }

    // 5. Test Public Filters (Products by Store)
    console.log("\n[5] Testing GET /api/products?store_id=1 (Public Filter)...");
    const prodRes = await request('GET', '/products?store_id=1');
    if (prodRes.status === 200) {
        console.log(`✅ Success. Status: 200. Products in Store 1: ${Array.isArray(prodRes.body) ? prodRes.body.length : 'Not an array'}`);
    } else {
        console.error("❌ Failed.", prodRes.status, prodRes.body);
    }

    // 6. Test City Filtering
    console.log("\n[6] Testing City Filtering...");

    // A. Get Cities
    console.log("   [A] Fetching Cities...");
    const citiesRes = await request('GET', '/cities');
    if (citiesRes.status === 200 && Array.isArray(citiesRes.body) && citiesRes.body.length > 0) {
        const cityId = citiesRes.body[0].city_id; // Using correct primary key 'city_id'
        console.log(`   ✅ Found ${citiesRes.body.length} cities. Using City ID: ${cityId} for testing.`);

        // B. Filter Stores by City
        console.log(`   [B] Get Stores for City ${cityId}...`);
        const cityStoresRes = await request('GET', `/stores?city_id=${cityId}`);
        const cityStoresCount = Array.isArray(cityStoresRes.body) ? cityStoresRes.body.length : 0;
        console.log(`       Stores in City ${cityId}: ${cityStoresCount}`);

        // C. Filter Products by City
        console.log(`   [C] Get Products for City ${cityId}...`);
        const cityProductsRes = await request('GET', `/products?city_id=${cityId}`);
        const cityProductsCount = Array.isArray(cityProductsRes.body) ? cityProductsRes.body.length : 0;
        console.log(`       Products in City ${cityId}: ${cityProductsCount}`);

        // D. Show All (No Filter) Verification
        console.log("   [D] Verifying 'Show All' (No Filter)...");
        const allStoresRes = await request('GET', '/stores');
        const allStoresCount = Array.isArray(allStoresRes.body) ? allStoresRes.body.length : 0;

        const allProductsRes = await request('GET', '/products');
        const allProductsCount = Array.isArray(allProductsRes.body) ? allProductsRes.body.length : 0;

        console.log(`       All Stores: ${allStoresCount} (Should be >= ${cityStoresCount})`);
        console.log(`       All Products: ${allProductsCount} (Should be >= ${cityProductsCount})`);

        if (allStoresCount >= cityStoresCount && allProductsCount >= cityProductsCount) {
            console.log("   ✅ 'Show All' vs 'Filter' logic verified.");
        } else {
            console.error("   ❌ Logic Error: Filtered results returned more than All results?");
        }

    } else {
        console.log("   ⚠️ No cities found or failed to fetch cities. Skipping City Filter tests.");
    }

    console.log("\n=== Test Complete ===");
}

runTests();
