var express = require('express');
var router = express.Router();

const Favorites = require('../../../models/favorites.js');
const favorites = new Favorites();

router.get('/', async function (request, response) {
  let data = await favorites.allFavorites();
  return response.status(200).json(data);
});

module.exports = router;
