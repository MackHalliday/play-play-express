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
}

module.exports = Favorites
