var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('test POST favorite to playlist', () => {
  beforeEach(async () => {
    await database.raw('truncate table favorites_playlist cascade');
    await database.raw('truncate table playlists cascade');
    await database.raw('truncate table favorites cascade');

    await database('favorites').insert([
      {id: 1, title: 'The Chain', artistName: 'Fleetwood Mac', genre: 'Rock', rating: 52},
      {id: 2, title: 'Truth Hurts', artistName: 'Lizzo', genre: 'Pop', rating: 40}
    ]);

    await database('playlists').insert([
      {id: 1, title: '80s Rock'},
      {id: 2, title: 'Chill Mix'}
    ]);
  });

  afterEach(async () => {
    await database.raw('truncate table favorites_playlist cascade');
    await database.raw('truncate table playlists cascade');
    await database.raw('truncate table favorites cascade');
  });

  it('user can add a favorite to a playlist', async () => {
    let response = await request(app)
      .post("/api/v1/playlists/3/favorites/3");

    // expect(await database('favorites').where('id', 2)).toBe(201);

    expect(response.statusCode).toBe(201);

    expect(response.body).toEqual({"Success": "Truth Hurts has been added to 80s Rock!"});

    let lastCreatedFavoritePlaylist = await database('favorites_playlist').orderBy('created_at', 'desc').first()

    expect(lastCreatedFavoritePlaylist.favorites_id).toBe(2);
    expect(lastCreatedFavoritePlaylist.playlists_id).toBe(1);

  });

  it('user cannot add a favorite to a playlist without a valid favorite or playlist id', async () => {
    let response = await request(app)
      .post("/api/v1/playlists/1/favorites/2000");

    expect(response.statusCode).toBe(400);

    expect(response.body).toEqual({"error": "Please enter a valid playlist and/or favorite id"});

  });

  // it('user cannot add a favorite to a playlist twice', async () => {
  //   await request(app)
  //     .post("/api/v1/playlists/2/favorites/2");
  //
  //   let response2 = await request(app)
  //     .post("/api/v1/playlists/2/favorites/2");
  //
  //   expect(response2.statusCode).toBe(400);
  //
  //   expect(response2.body).toEqual({"error": "The song has already been added to the playlist"});
  //
  // });
});
