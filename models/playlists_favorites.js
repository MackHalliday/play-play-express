const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class PlaylistsFavorites {
  constructor(){
  }

  async allPlaylistsFavorites(favoriteId, playlistId) {
    return database('favorites_playlist')
      .where('favorites_id', favoriteId)
      .where('playlists_id', playlistId)
  }
}

module.exports = PlaylistsFavorites
