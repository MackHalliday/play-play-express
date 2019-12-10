var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test playlists path', () => {
  beforeEach(async () => {
    await database.raw('truncate table playlists cascade');

    await database('playlists').insert([
      {title: '80s Rock', id: 1},
      {title: 'Chill Mix', id: 2},
      {title: 'Jazz Playlist', id: 3},
      {title: 'EDM Playlist', id: 4}
    ]);
  });

  afterEach( async () => {
    await database.raw('truncate table playlists cascade');
  });

  describe('test playlists GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/playlists");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(4);

      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('updated_at');
      expect(response.body[0]).toHaveProperty('created_at');

      expect(response.body[0].title).toBe('80s Rock');
    });
  });
});
