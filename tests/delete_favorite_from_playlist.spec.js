var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test playlist path', () => {
  beforeEach(async () => {
    await database.raw('truncate table favorites_playlist cascade');
    await database.raw('truncate table playlists cascade');
    await database.raw('truncate table favorites cascade');

    await database('favorites').insert([
      {id: 1, title: 'Track 1', artistName: 'Artist', genre: 'Genre', rating: 75},
      {id: 2, title: 'Track 2', artistName: 'Artist', genre: 'Genre', rating: 80},
      {id: 3, title: 'Track 3', artistName: 'Artist', genre: 'Genre', rating: 85},
      {id: 4, title: 'Track 4', artistName: 'Artist', genre: 'Genre', rating: 90}
    ]);

    await database('playlists').insert([
      {id: 1, title: 'Playlist 1'},
      {id: 2, title: 'Playlist 2'},
      {id: 3, title: 'Playlist 3'},
      {id: 4, title: 'Playlist 4'}
    ]);

    await database('favorites_playlist').insert([
      {id: 1, favorites_id: 1, playlists_id: 1},
      {id: 2, favorites_id: 2, playlists_id: 2},
      {id: 3, favorites_id: 3, playlists_id: 3},
    ]);
  });

  afterEach(async () => {
    await database.raw('truncate table favorites_playlist cascade');
    await database.raw('truncate table playlists cascade');
    await database.raw('truncate table favorites cascade');
  });

  describe('test remove favorite from playlist', () => {
    it('happy path', async () => {
      const response = await request(app)
        .delete("/api/v1/playlists/1/favorites/1");

      expect(response.statusCode).toBe(204);
      expect(await database('favorites_playlist').where('id', 1).select()).toEqual([]);
    });

    it('sad path must have a valid id', async () => {
      const response = await request(app)
        .delete("/api/v1/playlists/1/favorites/10000");

      expect(response.statusCode).toBe(404);
    });

    it('sad path server error', async () => {
      const response = await request(app)
        .delete("/api/v1/playlists/chicken/favorites/10000");

      expect(response.statusCode).toBe(500);
      expect(response.body).toEqual({"error": "Request could not be handled"});
    });
  });
});
