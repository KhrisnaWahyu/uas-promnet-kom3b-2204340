-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Jan 2024 pada 18.07
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2204340_khrisna_wahyu_wibisono_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_keuangan_khrisna`
--

CREATE TABLE `transaksi_keuangan_khrisna` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `amount` bigint(20) DEFAULT NULL,
  `status` enum('debit','kredit') DEFAULT NULL,
  `receiver` varchar(50) DEFAULT NULL,
  `jk` enum('L','P') DEFAULT NULL,
  `no_telp` varchar(13) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi_keuangan_khrisna`
--

INSERT INTO `transaksi_keuangan_khrisna` (`id`, `date`, `description`, `amount`, `status`, `receiver`, `jk`, `no_telp`, `address`) VALUES
(1, '2024-01-01', 'Dana Modal', 500000, 'debit', 'Budi Setiawan', 'L', '081234567890', 'Jl. Merdeka No. 10'),
(2, '2024-01-02', 'Penyewaan Auditorium', 250000, 'kredit', 'Siti Rahayu', 'P', '087654321098', 'Jl. Gajah Mada No. 15'),
(3, '2024-01-03', 'Pembayaran Dana Sponsor', 1000000, 'debit', 'Agus Suryanto', 'L', '08551112222', 'Jl. Pahlawan No. 25'),
(4, '2024-01-04', 'Dana Merchandise', 650000, 'debit', 'Dewi Pratiwi', 'P', '03334445555', 'Jl. Cendrawasih No. 30'),
(5, '2024-01-05', 'Penyewaan SoundSystem', 300000, 'kredit', 'Hadi Santoso', 'L', '06667778888', 'Jl. Diponegoro No. 40'),
(6, '0000-00-00', '', 0, '', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `transaksi_keuangan_khrisna`
--
ALTER TABLE `transaksi_keuangan_khrisna`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `transaksi_keuangan_khrisna`
--
ALTER TABLE `transaksi_keuangan_khrisna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
