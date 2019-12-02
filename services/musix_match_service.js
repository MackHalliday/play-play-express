const fetch = require('node-fetch');

class MusixMatchService {
  constructor(){
    this.baseUrl = "http://api.musixmatch.com/ws/1.1"
  }
  async getSongData(songName){
    let response = await fetch(`${this.baseUrl}/track.search?q_track=${songName}&apikey=${process.env.MUSIX_MATCH_API_KEY}`)
    return response.json();
  }
}
module.exports = MusixMatchService
