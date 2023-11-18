-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 17 nov. 2023 à 23:16
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `librairie`
--

-- --------------------------------------------------------

--
-- Structure de la table `books`
--

CREATE TABLE `books` (
  `ID_book` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Author` varchar(255) NOT NULL,
  `Note` varchar(255) DEFAULT NULL,
  `Last_Modification` datetime DEFAULT NULL,
  `ID_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `books`
--

INSERT INTO `books` (`ID_book`, `Title`, `Author`, `Note`, `Last_Modification`, `ID_user`) VALUES
(18, 'Harry Potter à l\'école des sorciers', 'J.K. Rowling', 'Note: 5 - Excellent\n\n\"Une œuvre exceptionnelle, captivante du début à la fin. Un incontournable de la littérature.\"', '2023-11-17 22:49:38', 20),
(19, 'Le Seigneur des Anneaux', 'J.R.R Tolkien', 'Note: 4 - Très Bien\n\n\"Une lecture plaisante avec une histoire riche en détails. Recommandé pour les amateurs de fantasy.\"', '2023-11-17 22:51:26', 20),
(20, '1984', 'George Orwell', 'Note: 5 - Magnifique\n\n\"Une vision prophétique du futur, qui incite profondément à la réflexion. Un classique intemporel.\"', '2023-11-17 22:52:13', 20),
(21, 'Le Petit Prince', 'Antoine de Saint-Exupéry', 'Note: 4 - Charmant\n\n\"Une histoire enchanteresse qui ravira les lecteurs de tous âges. Les illustrations sont simplement magiques.\"', '2023-11-17 22:54:31', 20);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `ID_user` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`ID_user`, `username`, `pass`) VALUES
(20, 'User', '$2b$10$G5jgzsWCTyof55/qWZ.oM.dpxWTGmh982WnOITldleHeMqw5vFf0q');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`ID_book`),
  ADD KEY `ID_user` (`ID_user`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `books`
--
ALTER TABLE `books`
  MODIFY `ID_book` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `ID_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `users` (`ID_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
