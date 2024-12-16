-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 08:23 AM
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
-- Database: `attendance_tracking`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL,
  `office_id` int(11) DEFAULT NULL,
  `check_in_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `check_out_time` timestamp NULL DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `work_type` enum('office','offsite') DEFAULT 'office',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `office_name` varchar(255) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `employee_id`, `office_id`, `check_in_time`, `check_out_time`, `location`, `work_type`, `created_at`, `office_name`, `approved`) VALUES
(219, 7, 3, '2024-12-08 09:39:31', '2024-12-08 09:41:04', '23.34542, 85.31004', 'office', '2024-12-08 09:39:31', 'Client Site', 0),
(220, 7, 3, '2024-12-08 09:49:51', '2024-12-08 09:50:33', '23.34542, 85.31004', 'office', '2024-12-08 09:49:51', 'Client Site', 0),
(221, 5, 3, '2024-12-08 10:58:30', '2024-12-08 11:03:01', '23.34542, 85.31004', 'office', '2024-12-08 10:58:30', 'Client Site', 0),
(222, 5, 3, '2024-12-08 11:03:33', '2024-12-08 11:05:04', '23.34542, 85.31004', 'office', '2024-12-08 11:03:33', 'Client Site', 0),
(223, 7, 3, '2024-12-08 11:05:51', '2024-12-08 11:06:06', '23.34542, 85.31004', 'office', '2024-12-08 11:05:51', 'Client Site', 1),
(224, 7, 3, '2024-12-08 11:07:13', '2024-12-08 11:08:25', '23.34542, 85.31004', 'office', '2024-12-08 11:07:13', 'Client Site', 0),
(225, 7, 1, '2024-12-08 11:08:50', '2024-12-08 11:08:58', '28.70410000, 77.10250000', 'office', '2024-12-08 11:08:50', NULL, 0),
(226, 7, 2, '2024-12-08 11:19:15', '2024-12-08 11:19:23', '23.35098570, 85.41327040', 'office', '2024-12-08 11:19:15', NULL, 0),
(227, 7, 3, '2024-12-08 11:22:03', '2024-12-08 11:22:42', '23.34542, 85.31004', 'office', '2024-12-08 11:22:03', 'Client Site', 0),
(228, 7, 2, '2024-12-08 11:22:57', '2024-12-08 11:23:28', '23.35098570, 85.41327040', 'office', '2024-12-08 11:22:57', NULL, 0),
(229, 7, 1, '2024-12-08 11:24:21', '2024-12-08 11:24:33', '28.70410000, 77.10250000', 'office', '2024-12-08 11:24:21', NULL, 0),
(230, 7, 3, '2024-12-08 11:39:35', '2024-12-08 11:40:29', '23.34542, 85.31004', 'office', '2024-12-08 11:39:35', 'Client Site', 1),
(231, 7, 2, '2024-12-08 11:40:48', '2024-12-08 11:40:54', '23.35098570, 85.41327040', 'office', '2024-12-08 11:40:48', NULL, 1),
(232, 7, 3, '2024-12-08 11:42:41', NULL, '23.34542, 85.31004', 'office', '2024-12-08 11:42:41', 'Client Site', 1),
(233, 5, 3, '2024-12-08 11:46:05', '2024-12-08 11:46:20', '23.34542, 85.31004', 'office', '2024-12-08 11:46:05', 'Client Site', 0),
(234, 5, 3, '2024-12-08 12:56:17', '2024-12-08 12:56:44', '23.34542, 85.31004', 'office', '2024-12-08 12:56:17', 'Client Site', 0),
(235, 5, 1, '2024-12-08 12:56:54', '2024-12-08 12:58:20', '28.70410000, 77.10250000', 'office', '2024-12-08 12:56:54', NULL, 0),
(236, 5, 3, '2024-12-08 12:59:00', '2024-12-08 13:11:17', '23.34542, 85.31004', 'office', '2024-12-08 12:59:00', 'Client Site', 0),
(237, 5, 2, '2024-12-08 13:11:29', '2024-12-08 13:12:05', '23.35098570, 85.41327040', 'office', '2024-12-08 13:11:29', 'Remote Office', 0),
(238, 5, 3, '2024-12-08 13:18:26', '2024-12-08 13:19:11', '23.34542, 85.31004', 'office', '2024-12-08 13:18:26', 'Client Site', 0),
(239, 5, 1, '2024-12-08 13:19:29', NULL, '28.70410000, 77.10250000', 'office', '2024-12-08 13:19:29', 'Head Office', 0),
(240, 5, 3, '2024-12-08 18:13:41', '2024-12-08 18:15:12', '23.34542, 85.31004', 'office', '2024-12-08 18:13:41', 'Client Site', 0),
(241, 5, 2, '2024-12-08 18:16:03', '2024-12-08 18:16:36', '23.35098570, 85.41327040', 'office', '2024-12-08 18:16:03', 'Remote Office', 0),
(242, 5, 1, '2024-12-08 18:20:37', '2024-12-08 18:21:17', '28.70410000, 77.10250000', 'office', '2024-12-08 18:20:37', 'Head Office', 0),
(243, 5, 3, '2024-12-08 18:21:57', '2024-12-08 18:22:51', '23.34542, 85.31004', 'office', '2024-12-08 18:21:57', 'Client Site', 0),
(244, 5, 2, '2024-12-08 18:32:30', '2024-12-08 18:32:46', '23.35098570, 85.41327040', 'office', '2024-12-08 18:32:30', 'Remote Office', 0),
(245, 5, 2, '2024-12-08 18:43:22', '2024-12-08 18:44:52', '23.35098570, 85.41327040', 'office', '2024-12-08 18:43:22', 'Remote Office', 0),
(246, 5, 1, '2024-12-08 18:46:19', '2024-12-08 18:47:13', '28.70410000, 77.10250000', 'office', '2024-12-08 18:46:19', 'Head Office', 1),
(247, 5, 2, '2024-12-08 18:49:38', '2024-12-08 18:49:51', '23.35098570, 85.41327040', 'office', '2024-12-08 18:49:38', 'Remote Office', 0),
(248, 5, 3, '2024-12-09 13:26:50', NULL, '23.34542, 85.31004', 'office', '2024-12-09 13:26:50', 'Client Site', 0),
(249, 7, 3, '2024-12-09 13:36:26', NULL, '23.34542, 85.31004', 'office', '2024-12-09 13:36:26', 'Client Site', 1),
(250, 5, 3, '2024-12-09 18:01:34', '2024-12-09 18:02:09', '23.34542, 85.31004', 'office', '2024-12-09 18:01:34', 'Client Site', 0),
(251, 5, 2, '2024-12-09 18:02:22', '2024-12-09 18:02:57', '23.35098570, 85.41327040', 'office', '2024-12-09 18:02:22', 'Remote Office', 0),
(252, 5, 3, '2024-12-10 04:37:25', '2024-12-10 04:38:32', '23.34542, 85.31004', 'office', '2024-12-10 04:37:25', 'Client Site', 0),
(253, 5, 1, '2024-12-10 04:39:08', '2024-12-10 04:39:21', '28.70410000, 77.10250000', 'office', '2024-12-10 04:39:08', 'Head Office', 1),
(254, 5, 3, '2024-12-10 05:19:10', '2024-12-10 05:19:31', '23.34542, 85.31004', 'office', '2024-12-10 05:19:10', 'Client Site', 0);

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `position` varchar(50) DEFAULT NULL,
  `role` enum('admin','employee') DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`id`, `name`, `email`, `position`, `role`, `password`, `created_at`) VALUES
(1, 'John Doe', NULL, 'Software Engineer', NULL, NULL, '2024-10-06 16:21:49'),
(5, 'Raj', 'raj@gmail.com', 'Developer', 'employee', '2345', '2024-10-16 04:57:50'),
(6, 'Vikramtest1', 'vikram@gmail.com', 'Senior Analyst', 'admin', '5566', '2024-12-01 15:22:55'),
(7, 'Abhi', 'abhi@gmail.com', 'Data Analyst', 'employee', '3333', '2024-12-03 15:35:00'),
(8, 'Rajesh', 'rajesh@gmail.com', 'Engineer', 'employee', '1234', '2024-12-09 15:51:01'),
(9, 'Sujeet', 'sujeet@gmail.com', 'UI/UX Designer', 'employee', '1234', '2024-12-10 04:42:00');

-- --------------------------------------------------------

--
-- Table structure for table `offices`
--

CREATE TABLE `offices` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `address` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offices`
--

INSERT INTO `offices` (`id`, `name`, `latitude`, `longitude`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Head Office', 28.70410000, 77.10250000, 'Delhi, India', '2024-12-04 16:11:16', '2024-12-04 16:11:16'),
(2, 'Remote Office', 23.35098570, 85.41327040, 'Jharkhand, India', '2024-12-04 16:11:16', '2024-12-06 18:34:17'),
(3, 'Client Site', 23.34542000, 85.31004000, 'Ranchi, India', '2024-12-04 16:11:16', '2024-12-06 18:29:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_office` (`office_id`),
  ADD KEY `attendance_ibfk_1` (`employee_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=255;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `offices`
--
ALTER TABLE `offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_office` FOREIGN KEY (`office_id`) REFERENCES `offices` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
