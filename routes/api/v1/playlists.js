var express = require('express');
var router = express.Router();

const Playlists = require('../../../models/playlists.js');
const playlists = new Playlists();

const Favorites = require('../../../models/favorites.js');
const favorites = new Favorites();


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
router.put('/:id', async function (request, response) {
  let playlistId = await request.params.id
  let title = await request.body.title

  let object = await playlists.findPlaylist(playlistId)

  if (object.length == 0) {
    return response.status(400).json({"error": "Please enter a valid id"});
  }
  try {
    if (!('title' in request.body)) {
      return response.status(400).json({"error": "You must include a title parameter in the request"});
    }
    if (request.body.title === '') {
      return response.status(400).json({"error": "Title cannot be blank"});
    }
    try {
      let data = await playlists.updatePlaylist(playlistId, title)
      return response.status(200).json(data)
    }
    catch(error) {
      return response.status(400).json({"error": "Please enter a unique title"});
    }
  }
  catch(error) {
    return response.status(500).json({"error": "Request could not be handled"});
  }
});
//
router.delete('/:id', async function (request, response) {
  try {
    let playlistId = await request.params.id
    let data = await playlists.findPlaylist(playlistId)

    if (data.length != 0){
      await playlists.deletePlaylist(data[0].id)
      return response.status(204).json(data);
    } else {
      return response.status(404).json({"error": "Record not found"});
    }
  }
  catch(error) {
    return response.status(500).json({"error": "Request could not be handled"});
  }
});
//

router.delete('/:playlist_id/favorites/:favorite_id', async function (request, response) {
  try {
    let playlistId = await request.params.playlist_id
    let favoriteId = await request.params.favorite_id
    let data = await playlists.removeFavorite(playlistId, favoriteId);
    if (data){
      return response.status(204).json(data);
    } else{
      return response.status(404).json({"error": "Record not found"})
    }
  }
  catch(error) {
    return response.status(500).json({"error": "Request could not be handled"});
  }
});

router.post('/', async function (request, response) {
  try {
    if (!('title' in request.body)) {
      return response.status(400).json({"error": "You must include a title parameter in the request"});
    }
    if (request.body.title === '') {
      return response.status(400).json({"error": "Title cannot be blank"});
    }
    try {
      let data = await playlists.createPlaylist(request.body.title)
      return response.status(201).json(data)
    }
    catch(error) {
      return response.status(400).json({"error": "Please enter a unique title"});
    }
  }
  catch(error) {
    return response.status(500).json({"error": "Request could not be handled"});
  }
});

router.post('/:playlist_id/favorites/:favorite_id', async function (request, response) {
  console.log(request.params)
  try {
    try {
      // let playlist_favorite = await database('favorites_playlist').where('favorites_id', request.params.favorite_id).where('playlists_id', request.params.playlist_id)
      // if(playlist_favorite.length != []) {
      //   return response.status(400).json({"error": "The song has already been added to the playlist"});
      // }
      let playlist = await playlists.findPlaylist(request.params.playlist_id)
      let favorite = await favorites.findFavorite(request.params.favorite_id)
      await playlists.addFavoriteToPlaylist(favorite[0].id, playlist[0].id)
      return response.status(201).json({"Success": `${favorite[0].title} has been added to ${playlist[0].title}!`})
    }
    catch(error) {
      return response.status(400).json({"error": "Please enter a valid playlist and/or favorite id"});
    }
  }
  catch(error) {
    return response.status(500).json({"error": "Request could not be handled"});
  }
});


module.exports = router;
