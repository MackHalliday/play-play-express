const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

class PlaylistObject {
  constructor(playlist){
    this.getSongCount(playlist)
    this.playlist = playlist;
    this.id = playlist[0].id;
    this.title= playlist[0].title;
    this.songCount = this.getSongCount(playlist);
    this.updated_at= playlist[0].updated_at;
    this.created_at= playlist[0].created_at;
  }

  async getSongCount(playlist){
    let favorites_count = await database('favorites_playlist').where('playlists_id', playlist[0].id).select();
    console.log(favorites_count.length)
    return favorites_count.length
  }

}

module.exports = PlaylistObject
