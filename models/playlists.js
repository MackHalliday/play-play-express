const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Playlists {
  constructor(){
  }

  async allPlaylists() {
    return database('playlists')
      .select();
  }
//
  async findPlaylist(playlistId) {
    return database('playlists')
      .where('id', playlistId);
  }
//
  async deletePlaylist(playlistId) {
    return database('playlists').where('id', playlistId).del()
  }
//
//   async createFavorite(trackObject){
//    return database('favorites')
//         .insert({
//                 title: trackObject.title,
//                 artistName: trackObject.artistName,
//                 genre: trackObject.genre,
//                 rating: trackObject.rating
//                 })
//         .returning(['id', 'title', 'artistName', 'genre', 'rating']);
//   }
}

module.exports = Playlists
