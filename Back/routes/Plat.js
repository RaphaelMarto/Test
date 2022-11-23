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

module.exports = router;