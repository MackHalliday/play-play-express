const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const PlaylistObject = require('../models/playlist_object.js');

class PlaylistsPresenter {
  async createResponse(allPlaylists){
    return await Promise.all(allPlaylists.map(async (playlist) => {
       return new PlaylistObject(playlist)
    }));
  }
}

module.exports = PlaylistsPresenter
