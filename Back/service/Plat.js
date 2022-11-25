const db = require('./db');
const helper = require('../helper');

async function getPlat(){
    const rows = await db.query(
      `SELECT Plat.idPlat, Plat.Prix, Plat.Libelle, Catégorie.Nom, Fournisseur.Nom as FourName,
      Fournisseur.idFour,Catégorie.idCat
      FROM Plat
      JOIN Catégorie ON Plat.idCat = Catégorie.idCat
      JOIN Fournisseur ON Plat.idFour = Fournisseur.idFour`
    );
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }

async function getFour(){
  const rows = await db.query(
    `SELECT idFour,Nom
    FROM Fournisseur`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function getCat(){
  const rows = await db.query(
    `SELECT idCat,Nom
    FROM Catégorie`
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function postPlat(plat){
  const result = await db.query(
    `INSERT INTO Plat 
    (Prix, Libelle, idCat, idFour) 
    VALUES 
    ('${plat.Prix}', '${plat.Libelle}', '${plat.idCat}', '${plat.idFour}')`
  );
  let message = 'Erreur de création du plat';

  if (result.affectedRows) {
    message = 'Le plat a bien été sauvegardée.';
  }

  return {message};
}

async function updatePlat(plat){
  const result = await db.query(
    `UPDATE Plat 
    SET Prix='${plat.Prix}', Libelle='${plat.Libelle}',
    idCat='${plat.idCat}' ,idFour='${plat.idFour}'
    WHERE idPlat='${plat.idPlat}'`
  );
  let message = 'Error in updating plat';

  if (result.affectedRows) {
    message = 'plat updated successfully';
  }

  return {message};
}

async function delPlat(plat){
  let p='(';
  for(let i=0;i<plat.length;i++){
    p+= plat[i]
    if(i+1<plat.length){
        p+=",";
    }
  }
  p+=')';
  const result = await db.query(
    `DELETE FROM Plat WHERE idPlat IN ${p}`
  );

  let message = 'Erreur lors de la supression';

  if (result.affectedRows) {
    message = 'Le plat a bien été supprimé';
  }

  return {message};
}

module.exports = {
    getPlat,
    getFour,
    getCat,
    postPlat,
    delPlat,
    updatePlat
  }