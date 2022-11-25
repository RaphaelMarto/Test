CREATE TABLE `sql7580109`.`Catégorie` (
  `idCat` INT NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`idCat`));

CREATE TABLE `sql7580109`.`Fournisseur` (
  `idFour` INT NOT NULL AUTO_INCREMENT,
  `Nom` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`idFour`));


CREATE TABLE `sql7580109`.`Plat` (
  `idPlat` INT NOT NULL AUTO_INCREMENT,
  `Libelle` VARCHAR(80) NOT NULL,
  `Prix` DECIMAL(5,2) NOT NULL,
  `idCat` INT NULL,
  `idFour` INT NULL,
  PRIMARY KEY (`idPlat`),
  CONSTRAINT `FK_PlatCat`
    FOREIGN KEY (`idCat`)
    REFERENCES `sql7580109`.`Catégorie` (`idCat`),
  CONSTRAINT `FK_PlatFour`
    FOREIGN KEY (`idFour`)
    REFERENCES `sql7580109`.`Fournisseur` (`idFour`));
