const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Favorites {
  constructor(){
  }

  async allFavorites() {
    return database('favorites')
      .columns('id', 'title', 'artistName', 'genre', 'rating')
      .select();
  }

  async findFavorite(favoriteId) {
    return database('favorites')
      .where('id', favoriteId)
      .columns('id', 'title', 'artistName', 'genre', 'rating');
  }

  async deleteFavorite(songID) {
    return database('favorites').where('id', songID).del()
  }

  async createFavorite(service) {
    await database('favorites')
    .insert({title: service.message.body.track_list[0].track.track_name,
             artistName: service.message.body.track_list[0].track.artist_name,
             rating: service.message.body.track_list[0].track.track_rating,
             genre: service.message.body.track_list[0].track.primary_genres
                    .music_genre_list[0].music_genre.music_genre_name
           })
    // return database('favorites')
    //   .where('title', service.message.body.track_list[0].track.track_name)
    //   .columns('id', 'title', 'artistName', 'genre', 'rating');

    return database('favorites').orderBy('created_at', 'desc').first()
  }
}

module.exports = Favorites
