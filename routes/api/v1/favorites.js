var express = require('express');
var router = express.Router();

const Favorites = require('../../../models/favorites.js');
const favorites = new Favorites();

const MusixMatchService = require('../../../services/musix_match_service.js');
const musixMatchService = new MusixMatchService();

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
    let service = await musixMatchService.getSongData(request.body.title)
    // console.log(!('title' in request.body)
    if (!('title' in request.body)) {
      return response.status(404).json({"error": "You must include a title parameter in the request"});
    }
    if (service.message.body.track_list.length === 0) {
      return response.status(404).json({"error": "Song with that title could not be found"});
    } else {
      let data = await favorites.createFavorite(service)
      return response.status(200).json(data);
    }
  }
  catch(error) {
    return response.status(500).json({ "error": "Unable to handle request" });
  }
});

module.exports = router;
