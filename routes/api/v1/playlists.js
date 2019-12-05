var express = require('express');
var router = express.Router();

const Playlists = require('../../../models/playlists.js');
const playlists = new Playlists();

// const FavoritesPresenter = require('../../../presenters/favorites_presenter.js');
// const favoritesPresenter = new FavoritesPresenter();

router.get('/', async function (request, response) {
 playlists.allPlaylists()
  .then((data) => {
     response.status(200).json(data);
   })
   .catch((error) => {
     return response.status(500).json({ error });
   });
});
//
// router.get('/:id', async function (request, response) {
//   try {
//     let favoriteId = await request.params.id
//     let data = await favorites.findFavorite(favoriteId)
//
//     if (data.length != 0){
//       return response.status(200).json(data);
//     } else {
//       return response.status(404).json({"error": "Record not found"});
//     }
//   }
//   catch(error) {
//     return response.status(500).json({ "error": "Unable to handle request" });
//   }
// });
//
// router.delete('/:id', async function (request, response) {
//
//   try {
//     let favoriteId = await request.params.id
//     let data = await favorites.findFavorite(favoriteId)
//     if (data.length != 0){
//       await favorites.deleteFavorite(data[0].id)
//       return response.status(204).json(data);
//     } else {
//       return response.status(404).json({"error": "Record not found"});
//     }
//   }
//   catch(error) {
//     return response.status(500).json({"error": "Request could not be handled"});
//   }
// });
//
// router.post('/', async function (request, response) {
//   try {
//
//     if (!('title' in request.body)) {
//       return response.status(404).json({"error": "You must include a title parameter in the request"});
//     }
//     let data = await favoritesPresenter.newFavorite(request.body)
//     if (data == undefined) {
//       return response.status(400).json({"error": "Record not created. Song with that title could not be found"});
//     } else {
//       return response.status(201).json(data);
//     }
//   }
//   catch(error) {
//     return response.status(500).json({"error": "Request could not be handled"});
//   }
// });


module.exports = router;
