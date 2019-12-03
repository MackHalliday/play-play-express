var express = require('express');
var router = express.Router();

const Favorites = require('../../../models/favorites.js');
const favorites = new Favorites();

router.get('/', async function (request, response) {
 favorites.allFavorites()
  .then((data) => {
     response.status(200).json(data);
   })
   .catch((error) => {
     return response.status(500).json({ error });
   });
});

module.exports = router;
