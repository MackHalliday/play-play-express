const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class PlaylistObject {
    constructor(playlist) {
      return (async () => {
        this.id = await playlist[0].id;
        this.title= await playlist[0].title;
        this.songCount = await this.getSongCount(playlist);
        this.updated_at= await playlist[0].updated_at;
        this.created_at= await playlist[0].created_at;
        return this;
      })();
    }

  async getSongCount(playlist){
    let favorites_count = await database('favorites_playlist').where('playlists_id', playlist[0].id).select();
    return favorites_count.length
  }
}

module.exports = PlaylistObject
