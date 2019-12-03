const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class Favorites {
  constructor(){
  }
  
  async allFavorites() {
    return database('favorites').select()
  }
}

module.exports = Favorites
