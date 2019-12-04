const fetch = require('node-fetch');

class MusixMatchService {
  constructor(){
    this.baseUrl = "http://api.musixmatch.com/ws/1.1"
  }
  async getTrackSearch(songName, artist){
    if (artist == undefined) {
      let response = await fetch(`${this.baseUrl}/track.search?q_track=${songName}&s_track_rating=desc&apikey=${process.env.MUSIX_MATCH_API_KEY}`)
      return response.json();
    } else {
      let response = await fetch(`${this.baseUrl}/track.search?q_track=${songName}&q_artist=${artist}&s_track_rating=desc&apikey=${process.env.MUSIX_MATCH_API_KEY}`)
      return response.json();
    };

  }
}

module.exports = MusixMatchService
