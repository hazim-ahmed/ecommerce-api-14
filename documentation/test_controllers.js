/**
 * سكربت اختبار المتحكمات الآلي
 * Automated Controller Test Script
 * 
 * :طريقة التشغيل
 * 1. تأكد من تشغيل السيرفر (npm start)
 * 2. قم بتشغيل هذا الملف عن طريق الأمر: node test_controllers.js
 * 
 * How to run:
 * 1. Ensure server is running (npm start)
 * 2. Run this script: node test_controllers.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const TEST_RESULTS_FILE = path.join(ROOT_DIR, 'test_results.txt');
const BASE_URL = '/api';
const PORT = 3000;

// تهيئة ملف النتائج
// Initialize results file
fs.writeFileSync(TEST_RESULTS_FILE, `Test Run at ${new Date().toISOString()}\nRoot Directory used for testing: ${ROOT_DIR}\n\n`);

function log(message) {
    console.log(message);
    fs.appendFileSync(TEST_RESULTS_FILE, message + '\n');
}

/**
 * دالة لإرسال الطلبات إلى السيرفر
 * Function to send requests to server
 */
function request(method, endpoint, body) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: PORT,
            path: BASE_URL + endpoint,
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve(parsed);
                    } else {
                        reject({ status: res.statusCode, data: parsed });
                    }
                } catch (e) {
                    reject({ status: res.statusCode, data: data, error: e.message });
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

async function runTests() {
    // كائن لتخزين المعرفات التي نحصل عليها لاستخدامها لاحقاً
    // Object to store captured IDs for later use
    const ids = {};

    async function test(controllerName, arabicName, endpoint, data, idKey) {
        log(`\n---------------------------------------------------`);
        log(`Testing Controller: ${controllerName}`);
        log(`Arabic Name: ${arabicName}`); // New Log
        log(`Endpoint: ${endpoint}`);
        log(`Sending Data: ${JSON.stringify(data, null, 2)}`);

        try {
            const result = await request('POST', endpoint, data);
            log(`Success! Response: ${JSON.stringify(result, null, 2)}`);

            // استخراج المعرف (ID) من الاستجابة
            // Extract ID
            let extractedId = null;
            if (idKey) {
                // محاولة العثور على المعرف في الاستجابة
                // Try to find the ID in the simplified response or nested object
                if (result[idKey]) {
                    extractedId = result[idKey];
                } else if (result.user && result.user[idKey]) {
                    extractedId = result.user[idKey];
                } else if (result.store && result.store[idKey]) {
                    extractedId = result.store[idKey];
                } else if (result.city && result.city[idKey]) {
                    extractedId = result.city[idKey];
                } else if (result.productCategory && result.productCategory[idKey]) {
                    extractedId = result.productCategory[idKey];
                } else if (result.product && result.product[idKey]) {
                    extractedId = result.product[idKey];
                } else if (result.coupon && result.coupon[idKey]) {
                    extractedId = result.coupon[idKey];
                } else {
                    // البحث بشكل متداخل
                    // Fallback: search recursively (shallow) or check standard 'id'
                    const keys = Object.keys(result);
                    for (const k of keys) {
                        if (typeof result[k] === 'object' && result[k] !== null && result[k][idKey]) {
                            extractedId = result[k][idKey];
                            break;
                        }
                    }
                }

                if (extractedId) {
                    ids[idKey] = extractedId;
                    log(`Captured ID [${idKey}]: ${extractedId}`); // تم التقاط المعرف
                } else {
                    log(`WARNING: Could not capture ID [${idKey}] from response.`);
                }
            }
        } catch (error) {
            log(`FAILED. Error: ${JSON.stringify(error, null, 2)}`);
        }
    }

    // 1. User
    await test('UserController', 'التحكم بالمستخدمين (Users)', '/users', {
        user_name: "AutoTest User",
        phone: "9665" + Math.floor(Math.random() * 100000000).toString().padStart(8, '0'),
        email: `autotest${Date.now()}@example.com`,
        password: "password123",
        user_type: "customer",
        user_avatar: "avatar.png",
        fcm_token: "token123"
    }, 'user_id');

    // 2. City
    await test('CityController', 'التحكم بالمدن (Cities)', '/cities', {
        city_name: "Test City " + Date.now(),
        city_name_en: "Test City En",
        price_per_km: 1.5,
        delivery_available: true,
        base_delivery_fee: 10
    }, 'city_id');

    // 3. Address (Need user_id, city_id)
    if (ids.user_id && ids.city_id) {
        await test('AddressController', 'التحكم بالعناوين (Addresses)', '/addresses', {
            user_id: ids.user_id,
            city_id: ids.city_id,
            address_title: "Home",
            address_line: "123 Main St",
            building_number: "12",
            floor_number: "2",
            apartment_number: "4",
            address_lat: 24.774265,
            address_lng: 46.738586
        }, 'address_id');
    } else {
        log("Skipping AddressController due to missing dependencies.");
    }

    // 4. StoreCategory
    await test('StoreCategoryController', 'التحكم بتصنيفات المتاجر (Store Categories)', '/store-categories', {
        category_name: "Test Category " + Date.now(),
        category_name_en: "Test Cat En",
        category_image: "cat.png"
    }, 'store_category_id');

    // 5. Store (Need user_id as vendor, city_id, store_category_id)
    if (ids.user_id && ids.city_id && ids.store_category_id) {
        await test('StoreController', 'التحكم بالمتاجر (Stores)', '/stores', {
            vendor_id: ids.user_id,
            city_id: ids.city_id,
            store_category_id: ids.store_category_id,
            store_name: "Test Store " + Date.now(),
            store_description: "Best store ever",
            store_lat: 24.774265,
            store_lng: 46.738586,
            store_status: "approved",
            is_open: true
        }, 'store_id');
    } else {
        log("Skipping StoreController due to missing dependencies.");
    }

    // 6. ProductCategory (Need store_id)
    if (ids.store_id) {
        await test('ProductCategoryController', 'التحكم بتصنيفات المنتجات (Product Categories)', '/product-categories', {
            store_id: ids.store_id,
            category_name: "Drinks",
            category_description: "Cold drinks"
        }, 'product_category_id');
    }

    // 7. Product (Need store_id, product_category_id)
    if (ids.store_id && ids.product_category_id) {
        await test('ProductController', 'التحكم بالمنتجات (Products)', '/products', {
            store_id: ids.store_id,
            product_category_id: ids.product_category_id,
            product_name: "Cola",
            product_description: "Tasty cola",
            product_price: 5.00,
            product_stock: 100,
            product_status: "active"
        }, 'product_id');
    }

    // 8. ProductOption (Need product_id)
    if (ids.product_id) {
        await test('ProductOptionController', 'التحكم بخيارات المنتجات (Product Options)', '/product-options', {
            product_id: ids.product_id,
            option_name: "Size",
            option_type: "single",
            option_values: { "Small": 0, "Large": 2 }
        }, 'product_option_id');
    }

    // 9. Coupon (Need store_id optional, let's use it)
    if (ids.store_id) {
        await test('CouponController', 'التحكم بقسائم الخصم (Coupons)', '/coupons', {
            store_id: ids.store_id,
            coupon_code: "SAVE" + Date.now(),
            coupon_type: "percentage",
            coupon_value: 10,
            valid_from: new Date().toISOString(),
            valid_to: new Date(Date.now() + 86400000).toISOString()
        }, 'coupon_id');
    }

    // 10. Banner (Need city_id optional)
    if (ids.city_id) {
        await test('BannerController', 'التحكم بالإعلانات/البنرات (Banners)', '/banners', {
            banner_title: "Promo Banner",
            banner_image: "banner.jpg",
            link_type: "url",
            link_value: "http://example.com",
            banner_position: "home_slider",
            city_id: ids.city_id
        }, 'banner_id');
    }

    // 11. Notification
    if (ids.user_id) {
        await test('NotificationController', 'التحكم بالإشعارات (Notifications)', '/notifications', {
            user_id: ids.user_id,
            notification_title: "Welcome",
            notification_body: "Thanks for joining!",
            notification_type: "system"
        }, 'notification_id');
    }

    // 12. Order (Need user_id, store_id, address_id)
    if (ids.user_id && ids.store_id && ids.address_id) {
        await test('OrderController', 'التحكم بالطلبات (Orders)', '/orders', {
            user_id: ids.user_id,
            store_id: ids.store_id,
            address_id: ids.address_id,
            order_number: "ORD-" + Date.now(),
            subtotal: 50,
            delivery_fee: 10,
            delivery_distance: 5.5,
            total: 60,
            payment_method: "cash",
            delivery_address: { street: "Main St", city: "Riyadh" } // Snapshot of address
        }, 'order_id');
    } else {
        log("Skipping OrderController due to missing dependencies.");
    }

    // 13. OrderItem (Need order_id, product_id)
    if (ids.order_id && ids.product_id) {
        await test('OrderItemController', 'التحكم بعناصر الطلب (Order Items)', '/order-items', {
            order_id: ids.order_id,
            product_id: ids.product_id,
            product_name: "Cola",
            quantity: 2,
            unit_price: 5,
            total_price: 10
        }, 'order_item_id');
    }

    // 14. Review (Need user_id, order_id, store_id for target)
    if (ids.user_id && ids.order_id && ids.store_id) {
        await test('ReviewController', 'التحكم بالتقييمات (Reviews)', '/reviews', {
            user_id: ids.user_id,
            order_id: ids.order_id,
            review_type: "store",
            target_id: ids.store_id,
            rating: 5,
            review_comment: "Excellent service!"
        }, 'review_id');
    }

    // 15. Transaction (Need user_id, order_id)
    if (ids.user_id && ids.order_id) {
        await test('TransactionController', 'التحكم بالعمليات المالية (Transactions)', '/transactions', {
            user_id: ids.user_id,
            transaction_type: "debit",
            amount: 60,
            balance_after: 1000,
            description: "Payment for Order #" + ids.order_id,
            reference_type: "order",
            reference_id: ids.order_id
        }, 'transaction_id');
    }

    // 16. CouponUsage (Need coupon_id, user_id, order_id)
    if (ids.coupon_id && ids.user_id && ids.order_id) {
        await test('CouponUsageController', 'التحكم باستخدام القسائم (Coupon Usage)', '/coupon-usages', {
            coupon_id: ids.coupon_id,
            user_id: ids.user_id,
            order_id: ids.order_id,
            discount_amount: 5.00
        }, 'coupon_usage_id');
    }

    // 17. OrderStatusHistory (Need order_id, user_id)
    if (ids.order_id && ids.user_id) {
        await test('OrderStatusHistoryController', 'التحكم بسجل حالات الطلب (Order Status History)', '/order-status-histories', {
            order_id: ids.order_id,
            status: "pending",
            status_notes: "Order placed initially",
            created_by: ids.user_id
        }, 'order_status_history_id');
    }

    log("\nTest Run Completed.");
}

runTests();
