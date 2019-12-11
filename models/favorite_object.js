class FavoriteObject {
  constructor(newTrack){
    this.title = newTrack.track.track_name
    this.artistName = newTrack.track.artist_name
    this.genre = this.getGenre(newTrack.track.primary_genres.music_genre_list)
    this.rating = newTrack.track.track_rating
  }

  getGenre(musicGenreList) {
    if (musicGenreList.length != 0){
      return musicGenreList[0].music_genre.music_genre_name
    } else {
      return "unknown"
    };
  }
}

module.exports = FavoriteObject
