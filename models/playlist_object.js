const Playlists = require('../models/playlists.js');
const playlists = new Playlists();

class PlaylistObject {
  constructor(playlist) {
    return (async () => {
      this.id = await playlist[0].id;
      this.title= await playlist[0].title;
      this.songCount = await playlists.getSongCountByPlaylist(playlist[0].id);
      this.songAvgRating = await playlists.getSongAverageRating(playlist[0].id)
      this.favorites = await playlists.getFavoritesByPlaylist(playlist[0].id)
      this.updated_at= await playlist[0].updated_at;
      this.created_at= await playlist[0].created_at;
      return this;
    })();
  }
}

module.exports = PlaylistObject
