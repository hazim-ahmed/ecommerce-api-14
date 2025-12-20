API Documentation & JWT Integration Guide
=========================================

1. JWT Authentication Guide (For UI/Frontend)
---------------------------------------------

The application uses JSON Web Tokens (JWT) for user authentication. 
This stateless authentication method requires the client (Flutter App) to manage the token.

### Step 1: Login / Signup
When a user successfully signs up or logs in, the API returns a JSON response containing a `token`.

**Response Example:**
```json
{
  "message": "Login successful",
  "user": {
    "user_id": 14,
    "email": "user@example.com",
    ...
  },
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}
```

### Step 2: Storing the Token
You must securely store this `token` on the device.
- **Flutter:** Use `flutter_secure_storage` or `SharedPreferences`.
- **Web:** Use `localStorage` or `sessionStorage`.

### Step 3: Making Authenticated Requests
For any request requiring authentication (e.g., getting user profile, creating orders), you MUST include the token in the **HTTP Headers**.

**Header Format:**
```
Authorization: Bearer <YOUR_TOKEN>
```
*Note: There is a space between "Bearer" and the token.*

### Step 4: Handling Token Expiration
If the API returns **401 Unauthorized**, it means the token is invalid or expired.
- **Action:** Redirect the user to the Login Screen and clear the stored token.


=========================================

2. API Endpoints List
-----------------------------------------
Base URL: http://<server_ip>:3000/api

### Authentication
- `POST /auth/signup`      : Register a new user
- `POST /auth/login`       : Login existing user
- `GET  /auth/me`          : Get current user profile (Requires Token)
- `POST /auth/logout`      : Logout user (Revoke token)

### Users
- `POST   /users`          : Create user (Admin/System)
- `GET    /users`          : List users
- `GET    /users/:id`      : Get user details
- `PUT    /users/:id`      : Update user
- `DELETE /users/:id`      : Delete user

### Stores
- `POST   /stores`         : Create store
- `GET    /stores`         : List stores
- `GET    /stores/:id`     : Get store details
- `PUT    /stores/:id`     : Update store
- `DELETE /stores/:id`     : Delete store

### Store Categories
- `POST   /store-categories`      : Create category
- `GET    /store-categories`      : List categories
- `GET    /store-categories/:id`  : Get category details
- `PUT    /store-categories/:id`  : Update category
- `DELETE /store-categories/:id`  : Delete category

### Products
- `POST   /products`       : Create product (Supports `multipart/form-data` for `product_images`)
- `GET    /products`       : List products
- `GET    /products/:id`   : Get product details
- `PUT    /products/:id`   : Update product (Supports `multipart/form-data` for `product_images`)
- `DELETE /products/:id`   : Delete product

### Product Categories
- `POST   /product-categories`     : Create product category
- `GET    /product-categories`     : List product categories
- `GET    /product-categories/:id` : Get category details
- `PUT    /product-categories/:id` : Update category
- `DELETE /product-categories/:id` : Delete category

### Product Options
- `POST   /product-options`      : Add options to product
- `GET    /product-options`      : List options
- `GET    /product-options/:id`  : Get option details
- `PUT    /product-options/:id`  : Update option
- `DELETE /product-options/:id`  : Delete option

### Orders
- `POST   /orders`         : Create new order
- `GET    /orders`         : List orders
- `GET    /orders/:id`     : Get order details
- `PUT    /orders/:id`     : Update order
- `DELETE /orders/:id`     : Delete order

### Order Items
- `POST   /order-items`       : Add item to order
- `GET    /order-items`       : List items
- `GET    /order-items/:id`   : Get item details
- `PUT    /order-items/:id`   : Update item
- `DELETE /order-items/:id`   : Delete item

### Order Status History
- `POST   /order-status-histories`     : Add status log
- `GET    /order-status-histories`     : List history
- `GET    /order-status-histories/:id` : Get log details
- `PUT    /order-status-histories/:id` : Update log
- `DELETE /order-status-histories/:id` : Delete log

### Banners (Ads)
- `POST   /banners`        : Create banner
- `GET    /banners`        : List banners
- `GET    /banners/:id`    : Get banner details
- `PUT    /banners/:id`    : Update banner
- `DELETE /banners/:id`    : Delete banner

### Cities
- `POST   /cities`         : Create city
- `GET    /cities`         : List cities
- `GET    /cities/:id`     : Get city details
- `PUT    /cities/:id`     : Update city
- `DELETE /cities/:id`     : Delete city

### Addresses
- `POST   /addresses`      : Add user address
- `GET    /addresses`      : List addresses
- `GET    /addresses/:id`  : Get address details
- `PUT    /addresses/:id`  : Update address
- `DELETE /addresses/:id`  : Delete address

### Coupons
- `POST   /coupons`        : Create coupon
- `GET    /coupons`        : List coupons
- `GET    /coupons/:id`    : Get coupon details
- `PUT    /coupons/:id`    : Update coupon
- `DELETE /coupons/:id`    : Delete coupon

### Coupon Usage
- `POST   /coupon-usages`      : Record usage
- `GET    /coupon-usages`      : List usages
- `GET    /coupon-usages/:id`  : Get usage details
- `PUT    /coupon-usages/:id`  : Update usage
- `DELETE /coupon-usages/:id`  : Delete usage

### Notifications
- `POST   /notifications`      : Send notification
- `GET    /notifications`      : List notifications
- `GET    /notifications/:id`  : Get notification details
- `PUT    /notifications/:id`  : Update notification (e.g. mark read)
- `DELETE /notifications/:id`  : Delete notification

### Transactions (Wallet)
- `POST   /transactions`       : Create transaction
- `GET    /transactions`       : List transactions
- `GET    /transactions/:id`   : Get transaction details
- `PUT    /transactions/:id`   : Update transaction
- `DELETE /transactions/:id`   : Delete transaction

### Reviews
- `POST   /reviews`        : Create review
- `GET    /reviews`        : List reviews
- `GET    /reviews/:id`    : Get review details
- `PUT    /reviews/:id`    : Update review
- `DELETE /reviews/:id`    : Delete review

=========================================

3. Image Uploads & Static Files
---------------------------------------------

### Uploading Images

The API supports image uploads for Products using `multipart/form-data`.

**Endpoint:** `POST /api/products` or `PUT /api/products/:id`

**Body Parameters (form-data):**

- `product_images`: File (Select one or multiple images, max 5)
- Other fields: `product_name`, `product_price`, etc. (as Text)

**Response:**

The API will return the product object with a `product_images` array containing the public URLs of the uploaded images.

```json
"product_images": [
    "http://<server_ip>:3000/uploads/products/product-123456789.jpg",
    "http://<server_ip>:3000/uploads/products/product-987654321.png"
]
```

### Accessing Images (Download)

Uploaded images are served statically. You can access/download them directly via their URL.

**Base Path:** `/uploads`
**Example URL:** `http://<server_ip>:3000/uploads/products/image_name.jpg`

---------------------------------------------
Generated: 2025-12-21
