-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 07 ديسمبر 2025 الساعة 21:44
-- إصدار الخادم: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `market`
--

-- --------------------------------------------------------

--
-- بنية الجدول `addresses`
--

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE IF NOT EXISTS `addresses` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `city_id` int NOT NULL,
  `address_title` varchar(50) NOT NULL,
  `address_line` varchar(255) DEFAULT NULL,
  `building_number` varchar(50) DEFAULT NULL,
  `floor_number` varchar(20) DEFAULT NULL,
  `apartment_number` varchar(20) DEFAULT NULL,
  `address_lat` decimal(10,8) NOT NULL,
  `address_lng` decimal(11,8) NOT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`address_id`),
  KEY `addresses_user_id` (`user_id`),
  KEY `addresses_city_id` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `addresses`
--

INSERT INTO `addresses` (`address_id`, `user_id`, `city_id`, `address_title`, `address_line`, `building_number`, `floor_number`, `apartment_number`, `address_lat`, `address_lng`, `is_default`, `created_at`, `updated_at`) VALUES
(1, 6, 2, 'Home', '123 Main St', '12', '2', '4', 24.77426500, 46.73858600, 0, '2025-12-07 21:28:17', '2025-12-07 21:28:17'),
(2, 7, 3, 'Home', '123 Main St', '12', '2', '4', 24.77426500, 46.73858600, 0, '2025-12-07 21:28:54', '2025-12-07 21:28:54'),
(3, 8, 4, 'Home', '123 Main St', '12', '2', '4', 24.77426500, 46.73858600, 0, '2025-12-07 21:30:34', '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `banners`
--

DROP TABLE IF EXISTS `banners`;
CREATE TABLE IF NOT EXISTS `banners` (
  `banner_id` int NOT NULL AUTO_INCREMENT,
  `banner_title` varchar(100) DEFAULT NULL,
  `banner_image` varchar(255) NOT NULL,
  `link_type` enum('none','store','product','category','url') NOT NULL,
  `link_value` varchar(255) DEFAULT NULL,
  `banner_position` enum('home_slider','home_banner','category') NOT NULL,
  `city_id` int DEFAULT NULL,
  `banner_status` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `starts_at` datetime DEFAULT NULL,
  `ends_at` datetime DEFAULT NULL,
  `clicks_count` int DEFAULT '0',
  `views_count` int DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`banner_id`),
  KEY `city_id` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `banners`
--

INSERT INTO `banners` (`banner_id`, `banner_title`, `banner_image`, `link_type`, `link_value`, `banner_position`, `city_id`, `banner_status`, `sort_order`, `starts_at`, `ends_at`, `clicks_count`, `views_count`, `created_at`, `updated_at`) VALUES
(1, 'Promo Banner', 'banner.jpg', 'url', 'http://example.com', 'home_slider', 1, 1, 0, NULL, NULL, 0, 0, '2025-12-07 21:27:27', '2025-12-07 21:27:27'),
(2, 'Promo Banner', 'banner.jpg', 'url', 'http://example.com', 'home_slider', 2, 1, 0, NULL, NULL, 0, 0, '2025-12-07 21:28:17', '2025-12-07 21:28:17'),
(3, 'Promo Banner', 'banner.jpg', 'url', 'http://example.com', 'home_slider', 3, 1, 0, NULL, NULL, 0, 0, '2025-12-07 21:28:54', '2025-12-07 21:28:54'),
(4, 'Promo Banner', 'banner.jpg', 'url', 'http://example.com', 'home_slider', 4, 1, 0, NULL, NULL, 0, 0, '2025-12-07 21:30:34', '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `cities`
--

DROP TABLE IF EXISTS `cities`;
CREATE TABLE IF NOT EXISTS `cities` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(100) NOT NULL,
  `city_name_en` varchar(100) DEFAULT NULL,
  `city_status` tinyint(1) DEFAULT '1',
  `delivery_available` tinyint(1) DEFAULT '1',
  `base_delivery_fee` decimal(10,2) DEFAULT '0.00',
  `price_per_km` decimal(10,2) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`city_id`),
  KEY `cities_city_status` (`city_status`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `cities`
--

INSERT INTO `cities` (`city_id`, `city_name`, `city_name_en`, `city_status`, `delivery_available`, `base_delivery_fee`, `price_per_km`, `created_at`, `updated_at`) VALUES
(1, 'Test City 1765142847061', 'Test City En', 1, 1, 10.00, 1.50, '2025-12-07 21:27:27', '2025-12-07 21:27:27'),
(2, 'Test City 1765142897454', 'Test City En', 1, 1, 10.00, 1.50, '2025-12-07 21:28:17', '2025-12-07 21:28:17'),
(3, 'Test City 1765142934250', 'Test City En', 1, 1, 10.00, 1.50, '2025-12-07 21:28:54', '2025-12-07 21:28:54'),
(4, 'Test City 1765143034276', 'Test City En', 1, 1, 10.00, 1.50, '2025-12-07 21:30:34', '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `coupons`
--

DROP TABLE IF EXISTS `coupons`;
CREATE TABLE IF NOT EXISTS `coupons` (
  `coupon_id` int NOT NULL AUTO_INCREMENT,
  `coupon_code` varchar(50) NOT NULL,
  `coupon_description` varchar(255) DEFAULT NULL,
  `coupon_type` enum('percentage','fixed') NOT NULL,
  `coupon_value` decimal(10,2) NOT NULL,
  `min_order` decimal(10,2) DEFAULT '0.00',
  `max_discount` decimal(10,2) DEFAULT NULL,
  `usage_limit` int DEFAULT NULL,
  `usage_per_user` int DEFAULT '1',
  `used_count` int DEFAULT '0',
  `city_id` int DEFAULT NULL,
  `store_id` int DEFAULT NULL,
  `coupon_status` tinyint(1) DEFAULT '1',
  `valid_from` datetime NOT NULL,
  `valid_to` datetime NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`coupon_id`),
  UNIQUE KEY `coupon_code` (`coupon_code`),
  KEY `store_id` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `coupons`
--

INSERT INTO `coupons` (`coupon_id`, `coupon_code`, `coupon_description`, `coupon_type`, `coupon_value`, `min_order`, `max_discount`, `usage_limit`, `usage_per_user`, `used_count`, `city_id`, `store_id`, `coupon_status`, `valid_from`, `valid_to`, `created_at`, `updated_at`) VALUES
(1, 'SAVE1765142847194', NULL, 'percentage', 10.00, 0.00, NULL, NULL, 1, 0, NULL, 1, 1, '2025-12-07 21:27:27', '2025-12-08 21:27:27', '2025-12-07 21:27:27', '2025-12-07 21:27:27'),
(2, 'SAVE1765142897543', NULL, 'percentage', 10.00, 0.00, NULL, NULL, 1, 0, NULL, 2, 1, '2025-12-07 21:28:17', '2025-12-08 21:28:17', '2025-12-07 21:28:17', '2025-12-07 21:28:17'),
(3, 'SAVE1765142934329', NULL, 'percentage', 10.00, 0.00, NULL, NULL, 1, 0, NULL, 3, 1, '2025-12-07 21:28:54', '2025-12-08 21:28:54', '2025-12-07 21:28:54', '2025-12-07 21:28:54'),
(4, 'SAVE1765143034380', NULL, 'percentage', 10.00, 0.00, NULL, NULL, 1, 0, NULL, 4, 1, '2025-12-07 21:30:34', '2025-12-08 21:30:34', '2025-12-07 21:30:34', '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `coupon_usage`
--

DROP TABLE IF EXISTS `coupon_usage`;
CREATE TABLE IF NOT EXISTS `coupon_usage` (
  `coupon_usage_id` int NOT NULL AUTO_INCREMENT,
  `coupon_id` int NOT NULL,
  `user_id` int NOT NULL,
  `order_id` int NOT NULL,
  `discount_amount` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`coupon_usage_id`),
  KEY `coupon_id` (`coupon_id`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `coupon_usage`
--

INSERT INTO `coupon_usage` (`coupon_usage_id`, `coupon_id`, `user_id`, `order_id`, `discount_amount`, `created_at`) VALUES
(1, 4, 8, 3, 5.00, '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `notification_title` varchar(150) NOT NULL,
  `notification_body` text NOT NULL,
  `notification_type` enum('order','promotion','system') NOT NULL,
  `notification_data` json DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_id`, `notification_title`, `notification_body`, `notification_type`, `notification_data`, `is_read`, `created_at`) VALUES
(1, 5, 'Welcome', 'Thanks for joining!', 'system', NULL, 0, '2025-12-07 21:27:27'),
(2, 6, 'Welcome', 'Thanks for joining!', 'system', NULL, 0, '2025-12-07 21:28:17'),
(3, 7, 'Welcome', 'Thanks for joining!', 'system', NULL, 0, '2025-12-07 21:28:54'),
(4, 8, 'Welcome', 'Thanks for joining!', 'system', NULL, 0, '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL,
  `user_id` int NOT NULL,
  `store_id` int NOT NULL,
  `driver_id` int DEFAULT NULL,
  `address_id` int NOT NULL,
  `order_status` enum('pending','accepted','preparing','ready','picked','on_way','delivered','rejected') DEFAULT 'pending',
  `subtotal` decimal(10,2) NOT NULL,
  `delivery_fee` decimal(10,2) NOT NULL,
  `delivery_distance` decimal(5,2) NOT NULL,
  `discount` decimal(10,2) DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL,
  `payment_method` enum('cash','card','wallet') NOT NULL,
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending',
  `coupon_id` int DEFAULT NULL,
  `delivery_address` json NOT NULL,
  `order_notes` text,
  `rejection_reason` text,
  `estimated_time` int DEFAULT NULL,
  `accepted_at` datetime DEFAULT NULL,
  `prepared_at` datetime DEFAULT NULL,
  `picked_at` datetime DEFAULT NULL,
  `delivered_at` datetime DEFAULT NULL,
  `cancelled_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_number` (`order_number`),
  KEY `address_id` (`address_id`),
  KEY `coupon_id` (`coupon_id`),
  KEY `orders_user_id` (`user_id`),
  KEY `orders_store_id` (`store_id`),
  KEY `orders_driver_id` (`driver_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `orders`
--

INSERT INTO `orders` (`order_id`, `order_number`, `user_id`, `store_id`, `driver_id`, `address_id`, `order_status`, `subtotal`, `delivery_fee`, `delivery_distance`, `discount`, `total`, `payment_method`, `payment_status`, `coupon_id`, `delivery_address`, `order_notes`, `rejection_reason`, `estimated_time`, `accepted_at`, `prepared_at`, `picked_at`, `delivered_at`, `cancelled_at`, `created_at`) VALUES
(1, 'ORD-1765142897575', 6, 2, NULL, 1, 'pending', 50.00, 10.00, 5.50, 0.00, 60.00, 'cash', 'pending', NULL, '{\"city\": \"Riyadh\", \"street\": \"Main St\"}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-07 21:28:17'),
(2, 'ORD-1765142934361', 7, 3, NULL, 2, 'pending', 50.00, 10.00, 5.50, 0.00, 60.00, 'cash', 'pending', NULL, '{\"city\": \"Riyadh\", \"street\": \"Main St\"}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-07 21:28:54'),
(3, 'ORD-1765143034418', 8, 4, NULL, 3, 'pending', 50.00, 10.00, 5.50, 0.00, 60.00, 'cash', 'pending', NULL, '{\"city\": \"Riyadh\", \"street\": \"Main St\"}', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `options_price` decimal(10,2) DEFAULT '0.00',
  `total_price` decimal(10,2) NOT NULL,
  `selected_options` json DEFAULT NULL,
  `item_notes` text,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `order__items_order_id` (`order_id`),
  KEY `order__items_product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `product_name`, `quantity`, `unit_price`, `options_price`, `total_price`, `selected_options`, `item_notes`, `created_at`) VALUES
(1, 1, 2, 'Cola', 2, 5.00, 0.00, 10.00, NULL, NULL, '2025-12-07 21:28:17'),
(2, 2, 3, 'Cola', 2, 5.00, 0.00, 10.00, NULL, NULL, '2025-12-07 21:28:54'),
(3, 3, 4, 'Cola', 2, 5.00, 0.00, 10.00, NULL, NULL, '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `order_status_history`
--

DROP TABLE IF EXISTS `order_status_history`;
CREATE TABLE IF NOT EXISTS `order_status_history` (
  `order_status_history_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `status` enum('pending','accepted','preparing','ready','picked','on_way','delivered','rejected') NOT NULL,
  `status_notes` text,
  `created_by` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`order_status_history_id`),
  KEY `order__status__history_order_id` (`order_id`),
  KEY `order__status__history_created_by` (`created_by`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `order_status_history`
--

INSERT INTO `order_status_history` (`order_status_history_id`, `order_id`, `status`, `status_notes`, `created_by`, `created_at`) VALUES
(1, 3, 'pending', 'Order placed initially', 8, '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `store_id` int NOT NULL,
  `product_category_id` int NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `product_description` text,
  `product_price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `product_images` json DEFAULT NULL,
  `product_stock` int DEFAULT NULL,
  `product_status` enum('active','inactive') DEFAULT 'active',
  `is_featured` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `products_store_id` (`store_id`),
  KEY `products_product_category_id` (`product_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `products`
--

INSERT INTO `products` (`product_id`, `store_id`, `product_category_id`, `product_name`, `product_description`, `product_price`, `discount_price`, `product_images`, `product_stock`, `product_status`, `is_featured`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Cola', 'Tasty cola', 5.00, NULL, NULL, 100, 'active', 0, '2025-12-07 21:27:27', '2025-12-07 21:27:27'),
(2, 2, 2, 'Cola', 'Tasty cola', 5.00, NULL, NULL, 100, 'active', 0, '2025-12-07 21:28:17', '2025-12-07 21:28:17'),
(3, 3, 3, 'Cola', 'Tasty cola', 5.00, NULL, NULL, 100, 'active', 0, '2025-12-07 21:28:54', '2025-12-07 21:28:54'),
(4, 4, 4, 'Cola', 'Tasty cola', 5.00, NULL, NULL, 100, 'active', 0, '2025-12-07 21:30:34', '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `product_categories`
--

DROP TABLE IF EXISTS `product_categories`;
CREATE TABLE IF NOT EXISTS `product_categories` (
  `product_category_id` int NOT NULL AUTO_INCREMENT,
  `store_id` int NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `category_description` text,
  `category_image` varchar(255) DEFAULT NULL,
  `category_status` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`product_category_id`),
  KEY `product__categories_store_id` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `product_categories`
--

INSERT INTO `product_categories` (`product_category_id`, `store_id`, `category_name`, `category_description`, `category_image`, `category_status`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 1, 'Drinks', 'Cold drinks', NULL, 1, 0, '2025-12-07 21:27:27', '2025-12-07 21:27:27'),
(2, 2, 'Drinks', 'Cold drinks', NULL, 1, 0, '2025-12-07 21:28:17', '2025-12-07 21:28:17'),
(3, 3, 'Drinks', 'Cold drinks', NULL, 1, 0, '2025-12-07 21:28:54', '2025-12-07 21:28:54'),
(4, 4, 'Drinks', 'Cold drinks', NULL, 1, 0, '2025-12-07 21:30:34', '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `product_options`
--

DROP TABLE IF EXISTS `product_options`;
CREATE TABLE IF NOT EXISTS `product_options` (
  `product_option_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `option_name` varchar(100) NOT NULL,
  `option_type` enum('single','multiple') NOT NULL,
  `option_values` json NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`product_option_id`),
  KEY `product__options_product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `product_options`
--

INSERT INTO `product_options` (`product_option_id`, `product_id`, `option_name`, `option_type`, `option_values`, `created_at`, `updated_at`) VALUES
(1, 1, 'Size', 'single', '{\"Large\": 2, \"Small\": 0}', '2025-12-07 21:27:27', '2025-12-07 21:27:27'),
(2, 2, 'Size', 'single', '{\"Large\": 2, \"Small\": 0}', '2025-12-07 21:28:17', '2025-12-07 21:28:17'),
(3, 3, 'Size', 'single', '{\"Large\": 2, \"Small\": 0}', '2025-12-07 21:28:54', '2025-12-07 21:28:54'),
(4, 4, 'Size', 'single', '{\"Large\": 2, \"Small\": 0}', '2025-12-07 21:30:34', '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_id` int NOT NULL,
  `review_type` enum('store','driver') NOT NULL,
  `target_id` int NOT NULL,
  `rating` tinyint NOT NULL,
  `review_comment` text,
  `is_visible` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `reviews`
--

INSERT INTO `reviews` (`review_id`, `user_id`, `order_id`, `review_type`, `target_id`, `rating`, `review_comment`, `is_visible`, `created_at`) VALUES
(1, 6, 1, 'store', 2, 5, 'Excellent service!', 1, '2025-12-07 21:28:17'),
(2, 7, 2, 'store', 3, 5, 'Excellent service!', 1, '2025-12-07 21:28:54'),
(3, 8, 3, 'store', 4, 5, 'Excellent service!', 1, '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `stores`
--

DROP TABLE IF EXISTS `stores`;
CREATE TABLE IF NOT EXISTS `stores` (
  `store_id` int NOT NULL AUTO_INCREMENT,
  `vendor_id` int NOT NULL,
  `city_id` int NOT NULL,
  `store_category_id` int NOT NULL,
  `store_name` varchar(100) NOT NULL,
  `store_description` text,
  `store_logo` varchar(255) DEFAULT NULL,
  `store_cover` varchar(255) DEFAULT NULL,
  `store_phone` varchar(20) DEFAULT NULL,
  `store_status` enum('pending','approved','rejected','suspended') DEFAULT 'pending',
  `is_open` tinyint(1) DEFAULT '0',
  `store_rating` decimal(2,1) DEFAULT '0.0',
  `rating_count` int DEFAULT '0',
  `min_order` decimal(10,2) DEFAULT '0.00',
  `store_lat` decimal(10,8) NOT NULL,
  `store_lng` decimal(11,8) NOT NULL,
  `store_address` varchar(255) DEFAULT NULL,
  `working_hours` json DEFAULT NULL,
  `rejection_reason` text,
  `approved_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`store_id`),
  KEY `stores_vendor_id` (`vendor_id`),
  KEY `stores_city_id` (`city_id`),
  KEY `stores_store_category_id` (`store_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `stores`
--

INSERT INTO `stores` (`store_id`, `vendor_id`, `city_id`, `store_category_id`, `store_name`, `store_description`, `store_logo`, `store_cover`, `store_phone`, `store_status`, `is_open`, `store_rating`, `rating_count`, `min_order`, `store_lat`, `store_lng`, `store_address`, `working_hours`, `rejection_reason`, `approved_at`, `created_at`, `updated_at`) VALUES
(1, 5, 1, 1, 'Test Store 1765142847121', 'Best store ever', NULL, NULL, NULL, 'approved', 1, 0.0, 0, 0.00, 24.77426500, 46.73858600, NULL, NULL, NULL, NULL, '2025-12-07 21:27:27', '2025-12-07 21:27:27'),
(2, 6, 2, 2, 'Test Store 1765142897496', 'Best store ever', NULL, NULL, NULL, 'approved', 1, 0.0, 0, 0.00, 24.77426500, 46.73858600, NULL, NULL, NULL, NULL, '2025-12-07 21:28:17', '2025-12-07 21:28:17'),
(3, 7, 3, 3, 'Test Store 1765142934283', 'Best store ever', NULL, NULL, NULL, 'approved', 1, 0.0, 0, 0.00, 24.77426500, 46.73858600, NULL, NULL, NULL, NULL, '2025-12-07 21:28:54', '2025-12-07 21:28:54'),
(4, 8, 4, 4, 'Test Store 1765143034330', 'Best store ever', NULL, NULL, NULL, 'approved', 1, 0.0, 0, 0.00, 24.77426500, 46.73858600, NULL, NULL, NULL, NULL, '2025-12-07 21:30:34', '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `store_categories`
--

DROP TABLE IF EXISTS `store_categories`;
CREATE TABLE IF NOT EXISTS `store_categories` (
  `store_category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `category_name_en` varchar(100) DEFAULT NULL,
  `category_icon` varchar(255) DEFAULT NULL,
  `category_image` varchar(255) DEFAULT NULL,
  `category_status` tinyint(1) DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`store_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `store_categories`
--

INSERT INTO `store_categories` (`store_category_id`, `category_name`, `category_name_en`, `category_icon`, `category_image`, `category_status`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'Test Category 1765142847103', 'Test Cat En', NULL, 'cat.png', 1, 0, '2025-12-07 21:27:27', '2025-12-07 21:27:27'),
(2, 'Test Category 1765142897485', 'Test Cat En', NULL, 'cat.png', 1, 0, '2025-12-07 21:28:17', '2025-12-07 21:28:17'),
(3, 'Test Category 1765142934273', 'Test Cat En', NULL, 'cat.png', 1, 0, '2025-12-07 21:28:54', '2025-12-07 21:28:54'),
(4, 'Test Category 1765143034318', 'Test Cat En', NULL, 'cat.png', 1, 0, '2025-12-07 21:30:34', '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `transactions`
--

DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `transaction_type` enum('credit','debit') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `balance_after` decimal(10,2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `reference_type` enum('order','withdrawal','refund','bonus') NOT NULL,
  `reference_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `transactions_user_id` (`user_id`),
  KEY `transactions_reference_id` (`reference_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `user_id`, `transaction_type`, `amount`, `balance_after`, `description`, `reference_type`, `reference_id`, `created_at`) VALUES
(1, 7, 'debit', 60.00, 1000.00, 'Payment for Order #2', 'order', 2, '2025-12-07 21:28:54'),
(2, 8, 'debit', 60.00, 1000.00, 'Payment for Order #3', 'order', 3, '2025-12-07 21:30:34');

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` enum('customer','vendor','driver','admin') NOT NULL,
  `user_status` enum('active','inactive','pending','blocked') DEFAULT 'pending',
  `user_avatar` varchar(255) DEFAULT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `phone_verified_at` datetime DEFAULT NULL,
  `fcm_token` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `users_phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `users_email` (`email`),
  KEY `users_user_type` (`user_type`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- إرجاع أو استيراد بيانات الجدول `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `phone`, `email`, `password`, `user_type`, `user_status`, `user_avatar`, `email_verified_at`, `phone_verified_at`, `fcm_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User 2', '0508888888', 'test88@example.com', '$2b$10$9rE.pDSZ10fUnYSHuJSu9uNfuyQtJkh82JcjdowTrL7UAn/MfdENm', 'customer', 'pending', NULL, NULL, NULL, NULL, '2025-12-06 18:35:29', '2025-12-06 18:35:29'),
(2, 'Test User', '0501234567', 'test@example.com', '$2b$10$l1k3xc.uhD9fJnR0YsLwleHS.TLmGPapR3EA3aSewcjaF4o.jIESu', 'customer', 'pending', NULL, NULL, NULL, NULL, '2025-12-06 19:21:34', '2025-12-06 19:21:34'),
(4, 'hazem', '775519772', 'tes@example.com', '$2b$10$q0GRsidyBa8yw0rq7vYemOE2JqWlLpZsrYIO/zRHUZC/gyx5cISUe', 'customer', 'pending', NULL, NULL, NULL, NULL, '2025-12-06 19:50:03', '2025-12-06 19:50:55'),
(5, 'AutoTest User', '966587589923', 'autotest1765142846822@example.com', '$2b$10$RUyP4BGFboNh2h3BEtk0juZIQ3FPLggfOgoDy36JyJqrJV1DQw7Fe', 'customer', 'pending', 'avatar.png', NULL, NULL, 'token123', '2025-12-07 21:27:27', '2025-12-07 21:27:27'),
(6, 'AutoTest User', '966586486018', 'autotest1765142897257@example.com', '$2b$10$VBQX8J4L51MJLAiNj9VrIO721sv9vGGrIgmwkMoFRqGEIDE85JKay', 'customer', 'pending', 'avatar.png', NULL, NULL, 'token123', '2025-12-07 21:28:17', '2025-12-07 21:28:17'),
(7, 'AutoTest User', '966515478333', 'autotest1765142934102@example.com', '$2b$10$nbQwCFbqzjuaR.ORkWCZ3OdvwuW.R6wThWuWYhzJ/aXB/HjXj0tLS', 'customer', 'pending', 'avatar.png', NULL, NULL, 'token123', '2025-12-07 21:28:54', '2025-12-07 21:28:54'),
(8, 'AutoTest User', '966534206846', 'autotest1765143034073@example.com', '$2b$10$VKb0bcYcfdYfNQn0pbMi0eX7kJHq/9COBxOZ7lSK3oe7lOR0RGKG2', 'customer', 'pending', 'avatar.png', NULL, NULL, 'token123', '2025-12-07 21:30:34', '2025-12-07 21:30:34');

--
-- قيود الجداول المُلقاة.
--

--
-- قيود الجداول `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `addresses_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `banners`
--
ALTER TABLE `banners`
  ADD CONSTRAINT `banners_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- قيود الجداول `coupons`
--
ALTER TABLE `coupons`
  ADD CONSTRAINT `coupons_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- قيود الجداول `coupon_usage`
--
ALTER TABLE `coupon_usage`
  ADD CONSTRAINT `coupon_usage_ibfk_1` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `coupon_usage_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `coupon_usage_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`driver_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`coupon_id`) REFERENCES `coupons` (`coupon_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- قيود الجداول `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `order_status_history`
--
ALTER TABLE `order_status_history`
  ADD CONSTRAINT `order_status_history_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_status_history_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- قيود الجداول `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`product_category_id`) REFERENCES `product_categories` (`product_category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `product_categories_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `product_options`
--
ALTER TABLE `product_options`
  ADD CONSTRAINT `product_options_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `stores`
--
ALTER TABLE `stores`
  ADD CONSTRAINT `stores_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stores_ibfk_2` FOREIGN KEY (`city_id`) REFERENCES `cities` (`city_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stores_ibfk_3` FOREIGN KEY (`store_category_id`) REFERENCES `store_categories` (`store_category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- قيود الجداول `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
