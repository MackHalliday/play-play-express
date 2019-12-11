var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test playlists path', () => {
  beforeEach(async () => {
    await database.raw('truncate table favorites_playlist cascade');
    await database.raw('truncate table playlists cascade');
    await database.raw('truncate table favorites cascade');

    await database('favorites').insert([
      {id: 1, title: 'Track 1', artistName: 'Artist', genre: 'Genre', rating: 50},
      {id: 2, title: 'Track 2', artistName: 'Artist', genre: 'Genre', rating: 100},
      {id: 3, title: 'Track 3', artistName: 'Artist', genre: 'Genre', rating: 90},
      {id: 4, title: 'Track 4', artistName: 'Artist', genre: 'Genre', rating: 2}
    ]);

    await database('playlists').insert([
      {id: 1, title: 'Playlist 1'},
      {id: 2, title: 'Playlist 2'},
      {id: 3, title: 'Playlist 3'},
      {id: 4, title: 'Playlist 4'}
    ]);

    await database('favorites_playlist').insert([
      {id: 1, favorites_id: 1, playlists_id: 1},
      {id: 2, favorites_id: 2, playlists_id: 1},
      {id: 3, favorites_id: 3, playlists_id: 1},
      {id: 4, favorites_id: 2, playlists_id: 2},
      {id: 5, favorites_id: 3, playlists_id: 3},
    ]);
  });

  afterEach(async () => {
    await database.raw('truncate table favorites_playlist cascade');
    await database.raw('truncate table playlists cascade');
    await database.raw('truncate table favorites cascade');
  });

  describe('test playlists GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/playlists");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(4);

      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('songCount');
      expect(response.body[0]).toHaveProperty('songAvgRating');
      expect(response.body[0]).toHaveProperty('favorites');
      expect(response.body[0]).toHaveProperty('updated_at');
      expect(response.body[0]).toHaveProperty('created_at');

      expect(response.body[0].title).toBe('Playlist 1');
      expect(response.body[0].songCount).toBe(3);
      expect(response.body[0].songAvgRating).toBe(80);
      expect(response.body[0].favorites.length).toBe(3);
      expect(response.body[0].favorites[0].title).toBe('Track 1');
    });
  });
});
