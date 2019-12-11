const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

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
}

module.exports = PlaylistsPresenter
