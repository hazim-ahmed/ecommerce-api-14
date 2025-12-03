// /models/index.js

const { sequelize } = require('../config/db');
const { Sequelize } = require('sequelize');

// ==============================================================
// ====================== USERS & AUTH ==========================
// ==============================================================

const User = require('./User');
const Address = require('./Address');
const Notification = require('./Notification');

// ==============================================================
// ======================= LOCATIONS ============================
// ==============================================================

const City = require('./City');

// ==============================================================
// ======================== STORES ==============================
// ==============================================================

const Store = require('./Store');
const StoreCategory = require('./StoreCategory');
const ProductCategory = require('./ProductCategory');
const Product = require('./Product');
const ProductOption = require('./ProductOption');

// ==============================================================
// ========================= ORDERS =============================
// ==============================================================

const Order = require('./Order');
const OrderItem = require('./OrderItem');
const OrderStatusHistory = require('./OrderStatusHistory');

// ==============================================================
// ===================== PAYMENT / WALLET =======================
// ==============================================================

const Transaction = require('./Transaction');

// ==============================================================
// ====================== COUPONS & ADS =========================
// ==============================================================

const Coupon = require('./Coupon');
const CouponUsage = require('./CouponUsage');
const Banner = require('./Banner');

// ==============================================================
// ======================== REVIEWS =============================
// ==============================================================

const Review = require('./Review');

// ==============================================================
// ===================== RELATIONSHIPS (FINAL v2) ===============
// ==============================================================

// ========== USERS ==========
User.hasMany(Address, { foreignKey: 'user_id', as: 'addresses' });
Address.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

// المستخدم كعميل
User.hasMany(Order, { foreignKey: 'user_id', as: 'customerOrders' });
Order.belongsTo(User, { foreignKey: 'user_id', as: 'customer' });

// المستخدم كموصل (طلب واحد نشط فقط في نفس الوقت - يُطبق في Business Logic)
User.hasMany(Order, { foreignKey: 'driver_id', as: 'driverOrders' });
Order.belongsTo(User, { foreignKey: 'driver_id', as: 'driver' });

// المستخدم يكتب مراجعات
User.hasMany(Review, { foreignKey: 'user_id', as: 'writtenReviews' });
Review.belongsTo(User, { foreignKey: 'user_id', as: 'reviewer' });

// المستخدم (موصل) يحصل على تقييمات
User.hasMany(Review, { 
    foreignKey: 'target_id', 
    constraints: false,
    scope: { review_type: 'driver' },
    as: 'driverReviews' 
});

User.hasMany(CouponUsage, { foreignKey: 'user_id', as: 'couponUsage' });
CouponUsage.belongsTo(User, { foreignKey: 'user_id' });

// المستخدم كمورد
User.hasMany(Store, { foreignKey: 'vendor_id', as: 'vendorStores' });
Store.belongsTo(User, { foreignKey: 'vendor_id', as: 'vendor' });

// المستخدم يقوم بتغيير حالات الطلبات (حسب صلاحياته)
User.hasMany(OrderStatusHistory, { foreignKey: 'created_by', as: 'statusChanges' });
OrderStatusHistory.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });


// ========== CITIES ==========
City.hasMany(Address, { foreignKey: 'city_id', as: 'addresses' });
Address.belongsTo(City, { foreignKey: 'city_id' });

City.hasMany(Store, { foreignKey: 'city_id', as: 'stores' });
Store.belongsTo(City, { foreignKey: 'city_id' });

City.hasMany(Banner, { foreignKey: 'city_id', as: 'banners' });
Banner.belongsTo(City, { foreignKey: 'city_id' });


// ========== STORE CATEGORIES ==========
StoreCategory.hasMany(Store, { foreignKey: 'store_category_id', as: 'stores' });
Store.belongsTo(StoreCategory, { foreignKey: 'store_category_id', as: 'category' });


// ========== STORES ==========
Store.hasMany(ProductCategory, { foreignKey: 'store_id', as: 'productCategories' });
ProductCategory.belongsTo(Store, { foreignKey: 'store_id' });

// كل منتج يخص متجر واحد فقط (لا مشاركة بين المتاجر)
Store.hasMany(Product, { foreignKey: 'store_id', as: 'products' });
Product.belongsTo(Store, { foreignKey: 'store_id' });

Store.hasMany(Order, { foreignKey: 'store_id', as: 'orders' });
Order.belongsTo(Store, { foreignKey: 'store_id' });

// المتجر يحصل على تقييمات
Store.hasMany(Review, { 
    foreignKey: 'target_id', 
    constraints: false,
    scope: { review_type: 'store' },
    as: 'reviews' 
});
Review.belongsTo(Store, { 
    foreignKey: 'target_id', 
    constraints: false,
    as: 'store'
});

// الكوبون خاص بالمتجر فقط (NOT NULL)
Store.hasMany(Coupon, { foreignKey: 'store_id', as: 'storeCoupons' });
Coupon.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });


// ========== PRODUCT CATEGORIES ==========
ProductCategory.hasMany(Product, { foreignKey: 'product_category_id', as: 'products' });
Product.belongsTo(ProductCategory, { foreignKey: 'product_category_id', as: 'category' });


// ========== PRODUCTS ==========
Product.hasMany(ProductOption, { foreignKey: 'product_id', as: 'options' });
ProductOption.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });


// ========== ADDRESSES ==========
Address.hasMany(Order, { foreignKey: 'address_id', as: 'orders' });
Order.belongsTo(Address, { foreignKey: 'address_id', as: 'deliveryAddress' });


// ========== ORDERS ==========
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Order.hasMany(OrderStatusHistory, { foreignKey: 'order_id', as: 'statusHistory' });
OrderStatusHistory.belongsTo(Order, { foreignKey: 'order_id' });

Order.hasMany(Review, { foreignKey: 'order_id', as: 'reviews' });
Review.belongsTo(Order, { foreignKey: 'order_id' });

// الطلب يستخدم كوبون واحد فقط (من نفس المتجر)
Order.hasOne(CouponUsage, { foreignKey: 'order_id', as: 'couponUsage' });
CouponUsage.belongsTo(Order, { foreignKey: 'order_id' });

Order.belongsTo(Coupon, { foreignKey: 'coupon_id' });
Coupon.hasMany(Order, { foreignKey: 'coupon_id', as: 'orders' });


// ========== COUPONS ==========
// الكوبون يمكن استخدامه عدة مرات (فقط في طلبات من نفس المتجر)
Coupon.hasMany(CouponUsage, { foreignKey: 'coupon_id', as: 'usage' });
CouponUsage.belongsTo(Coupon, { foreignKey: 'coupon_id' });


// ==============================================================
// ===================== END OF RELATIONSHIPS ===================
// ==============================================================

const db = {
    sequelize,
    Sequelize,

    User,
    Address,
    Notification,

    City,

    Store,
    StoreCategory,
    ProductCategory,
    Product,
    ProductOption,

    Order,
    OrderItem,
    OrderStatusHistory,

    Transaction,

    Banner,
    Coupon,
    CouponUsage,

    Review
};

module.exports = db;