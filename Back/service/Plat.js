const db = require('./db');
const helper = require('../helper');

async function getPlat(){
    const rows = await db.query(
      `SELECT Plat.idPlat, Plat.Prix, Plat.Libelle, Catégorie.Nom, Fournisseur.Nom as FourName
      FROM Plat
      JOIN Catégorie ON Plat.idCat = Catégorie.idCat
      JOIN Fournisseur ON Plat.idFour = Fournisseur.idFour`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }

module.exports = {
    getPlat,
  }