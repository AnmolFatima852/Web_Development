-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: May 10, 2026 at 03:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `luxe_mart_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `orders` int(11) DEFAULT 0,
  `joined` date DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `pass`, `phone`, `orders`, `joined`, `status`) VALUES
(1, 'Ali Raza', 'ali@example.com', 'pass123', '+92 300 1234567', 0, '2024-10-01', 'Active'),
(3, 'Anmol Fatima', '64316@students.riphah.edu.pk', 'abc123', '0123456789', 0, '2026-05-09', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `cust_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `payment` varchar(30) DEFAULT NULL,
  `items` text DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `status` varchar(30) DEFAULT 'Confirmed',
  `grand_total` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `cust_name`, `email`, `phone`, `address`, `payment`, `items`, `order_date`, `status`, `grand_total`) VALUES
(2, 'helo', 'heloo@gmail.com', '002366634437', 'Umer Block', 'cash', 'Smart Watch x1 = Rs 9,999\r\n\r\nTotal: Rs 10,798.92', '2026-05-09 16:58:17', 'Confirmed', 10798.92),
(3, 'Muhammad Raahim', 'MuhammadRaahim@gmail.com', '121235424632', 'Phase 8 Bahria Town', 'cash', 'Wireless Headphones x1 = Rs 5,999\nRunning Shoes x1 = Rs 5,499\nSmart Watch x1 = Rs 9,999\n\nTotal: Rs 23,216.76', '2026-05-09 18:53:34', 'Confirmed', 23216.76),
(5, 'Khizer', 'Khizer@gmail.com', '0123456759', 'Ali Block Bahria Phase 8', 'cash', 'Earrings x1 = Rs 700\n\nTotal: Rs 756', '2026-05-10 16:53:13', 'Confirmed', 756.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale` decimal(10,2) DEFAULT 0.00,
  `on_sale` tinyint(1) DEFAULT 0,
  `stock` int(11) DEFAULT 0,
  `category` varchar(50) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `sale`, `on_sale`, `stock`, `category`, `image`, `description`) VALUES
(1, 'Wireless Headphones', 7999.00, 5999.00, 1, 45, 'Electronics', 'https://www.shutterstock.com/image-photo/headphones-isolated-on-background-white-260nw-2641665609.jpg', 'Premium noise-cancelling headphones with 30hr battery life.'),
(2, 'Running Shoes', 5499.00, 0.00, 0, 30, 'Footwear', 'https://www.primepacee.com/cdn/shop/files/81lzkA09BWL._AC_UY1000.jpg?v=1734888151', 'Lightweight cushioned soles for maximum comfort.'),
(3, 'Smart Watch', 12999.00, 9999.00, 1, 20, 'Electronics', 'https://www.eshopnow.pk/cdn/shop/files/V200UltraSmartWatch.jpg?v=1712348500&width=1500', 'Track health, notifications, and fitness all day.'),
(4, 'Leather Wallet', 2499.00, 0.00, 0, 60, 'Accessories', 'https://shoppoint.pk/cdn/shop/files/LV-White-Signature-Wallet.webp?v=1740118020', 'Slim genuine leather wallet with RFID protection.'),
(5, 'Treadmill', 34999.00, 24999.00, 1, 15, 'Fitness', 'https://everfit.com.au/cdn/shop/files/TMILL-CHI-450-AUTO-99.jpg?v=1776412710', 'Premium folding treadmill with LCD display.'),
(6, 'Sunglasses', 4499.00, 0.00, 0, 35, 'Accessories', 'https://cdn.shopify.com/s/files/1/0754/2580/8607/files/Facetune_27-02-2026-18-57-18.jpg?v=1772631731', 'UV400 polarized lenses in a titanium frame.'),
(7, 'Coffee Maker', 8999.00, 6999.00, 1, 25, 'Home & Living', 'https://www.foodandwine.com/thmb/wI7NxUQzm2cAaP6JfNGcqtT2-Yc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/faw-technivorm-moccamaster-kbgv-select-10c-coffee-maker-nsimpson-50-1-46e4dc9cb33544a185fab8b24919e588.jpeg', 'Brew café-quality coffee at home in minutes.'),
(8, 'Skincare Set', 5999.00, 0.00, 0, 40, 'Beauty', 'https://www.olim.pk/cdn/shop/files/Skincare.jpg?v=1770708671', 'Complete 5-step skincare routine for glowing skin.'),
(9, 'Finger Ring ', 800.00, 500.00, 1, 23, 'Accessories', 'https://m.media-amazon.com/images/I/51r+85X52nL.jpg', 'A ring is a circular band typically crafted from metal, stone, wood, or glass, worn as ornamental jewelry on fingers'),
(10, 'Earrings', 1000.00, 700.00, 1, 42, 'Accessories', 'https://alita.pk/cdn/shop/files/Butterflystuds_modernjewellery_alitaaccessories2_1024x.jpg?v=1710152303', 'Earrings are versatile items of jewelry traditionally attached through piercings or via clips/stickers');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
