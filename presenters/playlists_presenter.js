const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const Favorites = require('../models/favorites.js');
const favorites = new Favorites();

const Playlists = require('../models/playlists.js');
const playlists = new Playlists();

const PlaylistObject = require('../models/playlist_object.js');

class PlaylistsPresenter {

  async createPlaylistObject(playlist){
    return new PlaylistObject(playlist)
  }
  async createResponse(allPlaylists){
    return await Promise.all(allPlaylists.map(async (playlist) => {
       return this.createPlaylistObject(playlist)
    }));
  }

  async getPlaylistFavoriteTitle(favoriteId, playlistId){
    let favorite = await favorites.findFavorite(favoriteId)
    let playlist = await playlists.findPlaylist(playlistId)
    if (favorite[0] && playlist[0]){
      return {favorite: favorite[0].title, playlist: playlist[0].title}
    } else {
      undefined
    }
  }
}

module.exports = PlaylistsPresenter
