const express = require('express');
const router = express.Router();
const Plat = require('../service/Plat')

router.get('/', async function(req, res, next) {
    try {
      res.json(await Plat.getPlat());
    } catch (err) {
      console.error(`Error while getting the dish `, err.message);
      next(err);
    }
  });

router.get('/Categorie', async function(req, res, next) {
  try {
    res.json(await Plat.getCat());
  } catch (err) {
    console.error(`Error while getting the Catégorie `, err.message);
    next(err);
  }
});

router.get('/Fournisseur', async function(req, res, next) {
  try {
    res.json(await Plat.getFour());
  } catch (err) {
    console.error(`Error while getting the Fournisseur `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    res.json(await Plat.postPlat(
      {Prix: req.body.Prix,
      Libelle:req.body.Libelle,
      idCat: req.body.idCat,
      idFour: req.body.idFour}
      ));
  } catch (err) {
    console.error(`Error while creating a new dish `, err.message);
    next(err);
  }
});

router.put('/', async function(req, res, next) {
  try {
    res.json(await Plat.updatePlat({
      Prix: req.body.Prix,
      Libelle:req.body.Libelle,
      idCat: req.body.idCat,
      idFour: req.body.idFour,
      idPlat: req.body.idPlat
    }
      ));
  } catch (err) {
    console.error(`Error while updating`, err.message);
    next(err);
  }
});

router.delete('/', async function(req, res, next) {
  try {
    res.json(await Plat.delPlat(req.body));
  } catch (err) {
    console.error(`Error while deleting a dish `, err.message);
    next(err);
  }
});

module.exports = router;