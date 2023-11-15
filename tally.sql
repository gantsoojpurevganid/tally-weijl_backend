-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2023 at 07:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tally`
--

-- --------------------------------------------------------

--
-- Table structure for table `card`
--

CREATE TABLE `card` (
  `id` int(10) UNSIGNED NOT NULL,
  `price` int(11) DEFAULT 0,
  `qty` int(11) DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` int(10) UNSIGNED DEFAULT NULL,
  `isOrder` tinyint(1) DEFAULT 0,
  `productId` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `card`
--

INSERT INTO `card` (`id`, `price`, `qty`, `createdAt`, `updatedAt`, `userId`, `isOrder`, `productId`) VALUES
(2, 15000, 3, '2023-08-10 05:13:57', '2023-08-10 05:24:35', 1, 0, 6),
(3, 1, 1, '2023-08-10 05:22:31', '2023-08-10 05:22:31', 4, 0, 8);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `isPublished` tinyint(1) DEFAULT 1,
  `isFeatured` tinyint(1) DEFAULT 0,
  `images` varchar(255) DEFAULT 'default.png',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `userId` int(10) UNSIGNED DEFAULT NULL,
  `price` int(11) DEFAULT 1,
  `tags` varchar(255) DEFAULT '[''Шинэ бараа'']',
  `wallet` varchar(3) DEFAULT 'MNT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `description`, `isPublished`, `isFeatured`, `images`, `createdAt`, `updatedAt`, `userId`, `price`, `tags`, `wallet`) VALUES
(6, 'title', 'description', 1, 0, 'http://localhost:7900/products/1691640134993_Capture.PNG', '2023-08-10 03:04:53', '2023-08-10 04:02:14', 1, 5000, '[\'Шинэ бараа\']', 'MNT'),
(7, 'title', 'description', 0, 0, 'http://localhost:7900/products/1691640734892_Capture.PNG', '2023-08-10 04:12:14', '2023-08-10 04:15:49', 1, 1, '[\'Шинэ бараа\']', 'MNT'),
(8, 'test title', 'description +++', 1, 0, 'http://localhost:7900/products/1691644922522_Capture.PNG', '2023-08-10 05:22:02', '2023-08-10 05:22:02', 4, 1, '[\'Шинэ бараа\']', 'MNT');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `lname` varchar(50) DEFAULT '',
  `fname` varchar(50) DEFAULT '',
  `phone` varchar(12) NOT NULL,
  `phone_verified` datetime DEFAULT NULL,
  `image` varchar(250) DEFAULT 'default.png',
  `nickname` varchar(50) DEFAULT '',
  `email` varchar(50) NOT NULL,
  `email_verified_at` datetime DEFAULT NULL,
  `permission` int(11) NOT NULL DEFAULT 5,
  `address` text DEFAULT NULL,
  `phone2` varchar(12) DEFAULT '',
  `remember_token` text DEFAULT NULL,
  `verify` varchar(10) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `lname`, `fname`, `phone`, `phone_verified`, `image`, `nickname`, `email`, `email_verified_at`, `permission`, `address`, `phone2`, `remember_token`, `verify`, `password`, `createdAt`, `updatedAt`) VALUES
(1, '', '', '89920322', NULL, 'http://localhost:7900/pimages/1691634415252_Capture.PNG', '', 'yagamipassion0322@gmail.com', NULL, 1, 'СБД 6-р хороо 48-27', '88552244', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOm51bGwsImlhdCI6MTY5MTU3NTI4MywiZXhwIjoxNjkxNjYxNjgzfQ._MuLDzbkxtNJXAEi6lKCsmUc12asZhVQld8Nl87WoYc', NULL, '$2b$10$Ahm3yX8a5bqQ/0r5OKScEu5l4U9ay9WCGMN7h.i6lB31doxpvsyqS', '2023-08-09 10:01:22', '2023-08-10 02:26:55'),
(2, '', '', '88558855', NULL, 'http://localhost:7900/pimages/1691635871131_Capture.PNG', '', 'test@gmail.com', NULL, 5, 'СБД 6-р хороо 48-27', '88552244', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOm51bGwsImlhdCI6MTY5MTU3NTI4NiwiZXhwIjoxNjkxNjYxNjg2fQ.8HLZS4ri0jQGFF-79PeONuUagMp4mCHre33WRN9zLFw', NULL, '$2b$10$sb.v5IZZ.vradaLdWyPKbeHtVeI8vPO/dd9b5OFrOIwsrrtokIusG', '2023-08-09 10:01:26', '2023-08-10 02:51:11'),
(3, '', '', '88943434', NULL, 'default.png', '', 'test2@gmail.com', NULL, 5, 'СБД 6-р хороо 48-27', '88552244', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOm51bGwsImlhdCI6MTY5MTU3NTY2NywiZXhwIjoxNjkxNjYyMDY3fQ.u2UmCa-3lc1ebSVSI_tsdm1WbK3jH8kO9bb7-KoHwMM', NULL, '$2b$10$AeNhOIZB0h6l2LBSgrK2oe08v1bGBdrY4.sVTbTj25eD59xM7T4XK', '2023-08-09 10:07:47', '2023-08-09 10:09:03'),
(4, '', '', '88225544', NULL, 'default.png', '', 'test3@gmail.com', NULL, 1, '', '', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOm51bGwsImlhdCI6MTY5MTY0NDg2NiwiZXhwIjoxNjkxNzMxMjY2fQ.ep1LnTwXaP3UVfpq_-L7N2aTi9mae9NfvLACdQu0pcw', NULL, '$2b$10$cjbeILZPnrAA9JXxuKisyuplD8wtk5cmgwgRq/CvPHCNLXM2MgjV.', '2023-08-10 05:21:06', '2023-08-10 05:21:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `card`
--
ALTER TABLE `card`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `card`
--
ALTER TABLE `card`
  ADD CONSTRAINT `card_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `card_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
