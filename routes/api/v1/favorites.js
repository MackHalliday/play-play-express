var express = require('express');
var router = express.Router();

const Favorites = require('../../../models/favorites.js');
const favorites = new Favorites();

const FavoritesPresenter = require('../../../presenters/favorites_presenter.js');
const favoritesPresenter = new FavoritesPresenter();

router.get('/', async function (request, response) {
 favorites.allFavorites()
  .then((data) => {
     response.status(200).json(data);
   })
   .catch((error) => {
     return response.status(500).json({ error });
   });
});

router.get('/:id', async function (request, response) {
  try {
    let favoriteId = await request.params.id
    let data = await favorites.findFavorite(favoriteId)

    if (data.length != 0){
      return response.status(200).json(data);
    } else {
      return response.status(404).json({"error": "Record not found"});
    }
  }
  catch(error) {
    return response.status(500).json({ "error": "Unable to handle request" });
  }
});

router.delete('/:id', async function (request, response) {

  try {
    let favoriteId = await request.params.id
    let data = await favorites.findFavorite(favoriteId)
    if (data.length != 0){
      await favorites.deleteFavorite(data[0].id)
      return response.status(204).json(data);
    } else {
      return response.status(404).json({"error": "Record not found"});
    }
  }
  catch(error) {
    return response.status(500).json({"error": "Request could not be handled"});
  }
});

router.post('/', async function (request, response) {
  try {
    let data = await favoritesPresenter.newFavorite(request.body)
    if (data == undefined) {
      return response.status(400).json({"message": "Song does not exist"});
    } else {
      return response.status(201).json(data);
    }
  }
  catch(error) {
    return response.status(500).json({"error": "Request could not be handled"});
  }
});


module.exports = router;
