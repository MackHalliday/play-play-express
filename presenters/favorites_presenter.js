const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const MusixMatchService= require('../services/musix_match_service.js');
const musixMatchService = new MusixMatchService();

const Favorites = require('../models/favorites.js');
const favorites = new Favorites();

const Track = require('../models/track.js');


class FavoritesPresenter {

  async firstTrack(data) {
    return data.message.body.track_list[0]
  }

  async newFavorite(body) {
    let matchedTracks = await musixMatchService.getTrackSearch(body.title, body.artist);
    let newTrack = await this.firstTrack(matchedTracks);
    if (newTrack === undefined){
      return undefined
    } else {
      let trackObject = new Track(newTrack)
      return favorites.createFavorite(trackObject);
    }
  }
}

module.exports = FavoritesPresenter
