-- MySQL Script generated by MySQL Workbench
-- Sun Mar  9 16:37:34 2025
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fakezone_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fakezone_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fakezone_db` DEFAULT CHARACTER SET utf8 ;
USE `fakezone_db` ;

-- -----------------------------------------------------
-- Table `fakezone_db`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fakezone_db`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome_exibicao` VARCHAR(150) NOT NULL,
  `username` VARCHAR(60) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(150) NOT NULL,
  `biografia` LONGTEXT NULL,
  `imagem` VARCHAR(255) NULL DEFAULT 'DEFAULT NULL',
  `data_criacao` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `data_nascimento` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `emaill_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fakezone_db`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fakezone_db`.`categorias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(50) NOT NULL,
  `descricao` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fakezone_db`.`moods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fakezone_db`.`moods` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(30) NOT NULL,
  `emoji` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fakezone_db`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fakezone_db`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(150) NOT NULL,
  `conteudo` LONGTEXT NOT NULL,
  `post_imagem` VARCHAR(255) NULL DEFAULT 'Default',
  `data_criacao` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizacao` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `categorias_id` INT NOT NULL,
  `usuarios_id` INT NOT NULL,
  `moods_id` INT NOT NULL,
  INDEX `fk_posts_categorias_idx` (`categorias_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  INDEX `fk_posts_usuarios1_idx` (`usuarios_id` ASC) VISIBLE,
  INDEX `fk_posts_moods1_idx` (`moods_id` ASC) VISIBLE,
  CONSTRAINT `fk_posts_categorias`
    FOREIGN KEY (`categorias_id`)
    REFERENCES `fakezone_db`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_posts_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `fakezone_db`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_posts_moods1`
    FOREIGN KEY (`moods_id`)
    REFERENCES `fakezone_db`.`moods` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fakezone_db`.`newsletter`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fakezone_db`.`newsletter` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `data_inscricao` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `usuarios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_newsletter_usuarios1_idx` (`usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_newsletter_usuarios1`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `fakezone_db`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
