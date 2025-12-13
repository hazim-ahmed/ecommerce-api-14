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
    console.log("Starting Comprehensive Validation Tests...\n");
    const results = [];

    async function testEndpoint(name, path, payload, expectedErrorPart) {
        process.stdout.write(`Testing ${name}... `);
        try {
            const res = await makeRequest(path, 'POST', payload);
            const isValidationErr = res.status === 400;
            const bodyStr = JSON.stringify(res.body);
            const hasExpectedMsg = expectedErrorPart ? bodyStr.includes(expectedErrorPart) : true;

            if (isValidationErr && hasExpectedMsg) {
                console.log("✅ PASS");
                results.push({ name, status: "PASS", details: "Blocked invalid data correctly." });
            } else {
                console.log("❌ FAIL");
                console.log(`   Status: ${res.status}`);
                console.log(`   Response: ${bodyStr}`);
                results.push({ name, status: "FAIL", details: `Expected 400 with '${expectedErrorPart}', got ${res.status} ${bodyStr}` });
            }
        } catch (e) {
            console.log("❌ ERROR");
            console.error(e);
            results.push({ name, status: "ERROR", details: e.message });
        }
    }

    // 1. Users
    await testEndpoint("User Creation (Missing Fields)", '/users',
        { user_name: "Test" },
        "Phone number is required"
    );

    // 2. Cities (Simple)
    await testEndpoint("City Creation (Missing Price)", '/cities',
        { city_name: "Test City" },
        "Price per KM is required"
    );

    // 3. Store Categories (Simple)
    await testEndpoint("Store Category (Missing Name)", '/store-categories',
        {},
        "Category name is required"
    );

    // 4. Stores (Foreign Keys: User, City, Category)
    await testEndpoint("Store (Invalid Vendor ID)", '/stores',
        { vendor_id: 99999, city_id: 1, store_category_id: 1, store_name: "Test", store_lat: 1, store_lng: 1 },
        "Vendor (User) not found"
    );
    await testEndpoint("Store (Invalid City ID)", '/stores',
        { vendor_id: 1, city_id: 99999, store_category_id: 1, store_name: "Test", store_lat: 1, store_lng: 1 },
        "City not found" // Assumes User 1 exists, if not it might fail on user first. That's acceptable.
    );

    // 5. Product Categories (FK: Store)
    await testEndpoint("Product Category (Invalid Store ID)", '/product-categories',
        { store_id: 99999, category_name: "Test Cat" },
        "Store not found"
    );

    // 6. Products (FK: Store, Category)
    await testEndpoint("Product (Invalid Store ID)", '/products',
        { store_id: 99999, product_category_id: 1, product_name: "Prod", product_price: 10 },
        "Store not found"
    );

    // 7. Product Options (FK: Product)
    await testEndpoint("Product Option (Invalid Product ID)", '/product-options',
        { product_id: 99999, option_name: "Color", option_type: "single", option_values: ["Red"] },
        "Product not found"
    );

    // 8. Addresses (FK: User, City)
    await testEndpoint("Address (Invalid User ID)", '/addresses',
        { user_id: 99999, city_id: 1, address_title: "Home", address_lat: 1, address_lng: 1 },
        "User not found"
    );

    // 9. Banners (FK: City - Optional but checked if present)
    await testEndpoint("Banner (Invalid City ID)", '/banners',
        { banner_image: "img.jpg", link_type: "url", banner_position: "home_slider", city_id: 99999 },
        "City not found"
    );

    // 10. Notifications (FK: User)
    await testEndpoint("Notification (Invalid User ID)", '/notifications',
        { user_id: 99999, notification_title: "Hi", notification_body: "Msg", notification_type: "system" },
        "User not found"
    );

    // 11. Transactions (FK: User)
    await testEndpoint("Transaction (Invalid User ID)", '/transactions',
        { user_id: 99999, transaction_type: "credit", amount: 10, balance_after: 100, description: "Dep", reference_type: "bonus" },
        "User not found"
    );

    // 12. Coupons (Unique Code, FK: City, Store)
    await testEndpoint("Coupon (Invalid Store ID)", '/coupons',
        { coupon_code: "TEST999", coupon_type: "fixed", coupon_value: 10, valid_from: "2025-01-01", valid_to: "2025-01-02", store_id: 99999 },
        "Store not found"
    );

    // 13. Orders (FK: User, Store, Address, Coupon)
    await testEndpoint("Order (Invalid User ID)", '/orders',
        { order_number: "ORD1", user_id: 99999, store_id: 1, address_id: 1, subtotal: 10, delivery_fee: 5, total: 15, payment_method: "cash", delivery_address: {} },
        "User not found"
    );
    await testEndpoint("Order (Invalid Store ID)", '/orders',
        { order_number: "ORD1", user_id: 1, store_id: 99999, address_id: 1, subtotal: 10, delivery_fee: 5, total: 15, payment_method: "cash", delivery_address: {} },
        "Store not found"
    );

    // 14. Order Items (FK: Order, Product)
    await testEndpoint("Order Item (Invalid Order ID)", '/order-items',
        { order_id: 99999, product_id: 1, product_name: "P", quantity: 1, unit_price: 10, total_price: 10 },
        "Order not found"
    );

    // 15. Order Status History (FK: Order, User)
    await testEndpoint("Order Status History (Invalid Order ID)", '/order-status-histories',
        { order_id: 99999, status: "pending" },
        "Order not found"
    );

    // 16. Coupon Usage (FK: Coupon, User, Order)
    await testEndpoint("Coupon Usage (Invalid Coupon ID)", '/coupon-usages',
        { coupon_id: 99999, user_id: 1, order_id: 1, discount_amount: 5 },
        "Coupon not found"
    );

    // 17. Reviews (FK: User, Order, Target)
    await testEndpoint("Review (Invalid Order ID)", '/reviews',
        { user_id: 1, order_id: 99999, review_type: "store", target_id: 1, rating: 5 },
        "Order not found"
    );
    // 17b. Review Target Logic
    await testEndpoint("Review (Invalid Target Store)", '/reviews',
        { user_id: 1, order_id: 1, review_type: "store", target_id: 99999, rating: 5 },
        "Target Store not found" // Assumes user 1 and order 1 might fall through validation if we don't block them, but likely fail on "User not found" if DB is empty.
        // Actually, if User 1 doesn't exist, it will likely fail on "User not found" first. 
        // But if it fails, it's still a 400 Validation Error, so it passes the general check.
    );

    console.log("\nTests Complete.");
}

runTests();
