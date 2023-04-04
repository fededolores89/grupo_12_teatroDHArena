CREATE DATABASE IF NOT EXISTS `DHArena`;
USE `DHArena`;

CREATE TABLE `category` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `shows` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `price` FLOAT NOT NULL,
   `id_category` INT NOT NULL,
   `hour` VARCHAR(255) NOT NULL,
   `date` DATE NOT NULL,
   `descriptionHeader` VARCHAR(255),
   `descriptionVideo` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `usersType` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255),
   PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(255) NOT NULL,
   `lastname` VARCHAR(255) NOT NULL,
   `dni` VARCHAR(255) NOT NULL,
   `birth` VARCHAR(255) NOT NULL,
   `number` INT,
   `email` VARCHAR(255) NOT NULL,
   `password` VARCHAR(255) NOT NULL,
   `image` VARCHAR(255),
   `userTypeID` INT NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `shows` ADD CONSTRAINT `FK_0c1c78d6-bbcd-4fa6-ba2c-a3e2d5825c0b` FOREIGN KEY (`id_category`) REFERENCES `category`(`id`)  ;

ALTER TABLE `users` ADD CONSTRAINT `FK_edc835f1-8f0a-43b4-acdb-c7a20b7894e2` FOREIGN KEY (`userTypeID`) REFERENCES `usersType`(`id`)  