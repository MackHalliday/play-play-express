const fetch = require('node-fetch');

class MusixMatchService {
  constructor(){
    this.baseUrl = "http://api.musixmatch.com/ws/1.1"
  }
  async getCoordinatesAsync(songName){

    let response = await fetch(`${this.baseUrl}/track.search?q_track=${songName}&apikey=${process.env.MUSIX_MATCH_API_KEY}`)
    return await response.json()
  }
}
module.exports = MusixMatchService
