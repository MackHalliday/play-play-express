const Playlists = require('../models/playlists.js');
const playlists = new Playlists();

class PlaylistObject {
  constructor(playlist) {
    return (async () => {
      this.id = await playlist.id;
      this.title= await playlist.title;
      this.songCount = await playlists.getSongCountByPlaylist(playlist.id);
      this.songAvgRating = await playlists.getSongAverageRating(playlist.id)
      this.favorites = await playlists.getFavoritesByPlaylist(playlist.id)
      this.updated_at= await playlist.updated_at;
      this.created_at= await playlist.created_at;
      return this;
    })();
  }
}

module.exports = PlaylistObject
