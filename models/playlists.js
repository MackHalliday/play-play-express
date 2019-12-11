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

  async updatePlaylist(id, new_title) {
    return database('playlists')
      .where('id', id)
      .update({ title: new_title })
      .returning(['id', 'title', 'created_at', 'updated_at']);
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
  async createPlaylist(title){
   return database('playlists')
        .insert({
                title: title,
                })
        .returning(['id', 'title', 'created_at', 'updated_at']);
  }

  async removeFavoriteFromPlaylist(playlistId, favoriteId){
    return database('favorites_playlist')
          .where({
                'favorites_id': favoriteId,
                'playlists_id': playlistId
                })
          .del()
  }

  async getFavoritesByPlaylist(playlistId){
    return database('favorites')
          .join('favorites_playlist', 'favorites.id', '=', 'favorites_playlist.favorites_id')
          .where('playlists_id', playlistId)
          .columns('favorites_id as id','title', 'artistName', 'genre', 'rating')
          .select()
  }

  async getSongAverageRating(playlistId){
   let avgRating = await database('favorites')
                   .join('favorites_playlist', 'favorites.id', '=', 'favorites_playlist.favorites_id')
                   .where('playlists_id', playlistId)
                   .avg('rating')
                   .first()
   return parseFloat(avgRating.avg)
  }

  async getSongCountByPlaylist(playlistId){
    let favoritesCount = await database('favorites_playlist')
                          .where('playlists_id', playlistId)
                          .count('playlists_id')
                          .first()
    return parseFloat(favoritesCount.count)
  }

  async addFavoriteToPlaylist(favoriteId, playlistId) {
    return database('favorites_playlist').insert({favorites_id: favoriteId,
      playlists_id: playlistId});
  }

}

module.exports = Playlists
