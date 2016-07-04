-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema GiftShop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema GiftShop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GiftShop` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `GiftShop` ;

-- -----------------------------------------------------
-- Table `GiftShop`.`UserType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GiftShop`.`UserType` (
  `Id` INT NOT NULL,
  `Description` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GiftShop`.`Category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GiftShop`.`Category` (
  `Id` INT NOT NULL,
  `Description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GiftShop`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GiftShop`.`User` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(500) NOT NULL,
  `FullName` VARCHAR(50) NULL,
  `Address` VARCHAR(60) NULL,
  `Phone` VARCHAR(15) NULL,
  `Created` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `UserTypeId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_User_UserType_idx` (`UserTypeId` ASC),
  CONSTRAINT `fk_User_UserType`
    FOREIGN KEY (`UserTypeId`)
    REFERENCES `GiftShop`.`UserType` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GiftShop`.`Gift`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GiftShop`.`Gift` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(30) NOT NULL,
  `Description` VARCHAR(200) NULL,
  `Image1Path` VARCHAR(200) NULL,
  `Image2Path` VARCHAR(200) NULL,
  `Image3Path` VARCHAR(200) NULL,
  `Active` TINYINT(1) NOT NULL,
  `CategoryId` INT NOT NULL,
  `OwnerId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Gift_Category1_idx` (`CategoryId` ASC),
  INDEX `fk_Gift_User1_idx` (`OwnerId` ASC),
  CONSTRAINT `fk_Gift_Category1`
    FOREIGN KEY (`CategoryId`)
    REFERENCES `GiftShop`.`Category` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Gift_User1`
    FOREIGN KEY (`OwnerId`)
    REFERENCES `GiftShop`.`User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GiftShop`.`Offer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GiftShop`.`Offer` (
  `Id` INT NOT NULL,
  `OwnerId` INT NOT NULL,
  `OffererId` INT NOT NULL,
  `GiftId` INT NOT NULL,
  `Created` DATETIME NOT NULL,
  `Accepted` TINYINT(1) NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Offer_User1_idx` (`OwnerId` ASC),
  INDEX `fk_Offer_User2_idx` (`OffererId` ASC),
  INDEX `fk_Offer_Gift1_idx` (`GiftId` ASC),
  CONSTRAINT `fk_Offer_User1`
    FOREIGN KEY (`OwnerId`)
    REFERENCES `GiftShop`.`User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Offer_User2`
    FOREIGN KEY (`OffererId`)
    REFERENCES `GiftShop`.`User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Offer_Gift1`
    FOREIGN KEY (`GiftId`)
    REFERENCES `GiftShop`.`Gift` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `GiftShop`.`Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `GiftShop`.`Message` (
  `Id` INT NOT NULL,
  `Text` VARCHAR(100) NOT NULL,
  `Created` DATETIME NOT NULL,
  `FromId` INT NOT NULL,
  `ToId` INT NOT NULL,
  PRIMARY KEY (`Id`),
  INDEX `fk_Message_User1_idx` (`FromId` ASC),
  INDEX `fk_Message_User2_idx` (`ToId` ASC),
  CONSTRAINT `fk_Message_User1`
    FOREIGN KEY (`FromId`)
    REFERENCES `GiftShop`.`User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Message_User2`
    FOREIGN KEY (`ToId`)
    REFERENCES `GiftShop`.`User` (`Id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
