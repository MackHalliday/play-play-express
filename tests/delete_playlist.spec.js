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

  describe('test playlist DELETE', () => {
    it('happy path', async () => {
      const response = await request(app)
        .delete("/api/v1/playlists/2");

      expect(response.statusCode).toBe(204);
      expect(await database('playlists').where('id', 2).select()).toEqual([]);
      expect(await database('playlists').where('title','Chill Mix').select()).toEqual([]);
    });

    it('sad path', async () => {
      const response = await request(app)
        .delete("/api/v1/playlists/2");

      expect(response.statusCode).toBe(204);
      expect(await database('playlists').where('id', 2).select()).toEqual([]);

      const response2 = await request(app)
        .delete("/api/v1/playlists/2");

      expect(response2.statusCode).toBe(404);

      expect(response2.body).toStrictEqual({"error": "Record not found"});

      const response3 = await request(app)
        .delete("/api/v1/playlists/chicken");

      expect(response3.statusCode).toBe(500);

      expect(response3.body).toStrictEqual({"error": "Request could not be handled"});
    });
  });
});
