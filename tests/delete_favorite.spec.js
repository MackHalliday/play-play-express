var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test favorites path', () => {
  beforeEach(async () => {
    await database.raw('truncate table favorites cascade');

    await database('favorites').insert([
      {title: 'The Chain', artistName: 'Fleetwood Mac', genre: 'Rock', rating: 52, id: 1},
      {title: 'Truth Hurts', artistName: 'Lizzo', genre: 'Pop', rating: 40, id: 2},
      {title: 'Baby One More Time', artistName: 'Britney Spears', genre: 'Pop', rating: 91, id: 3},
      {title: 'Toxic', artistName: 'Britney Spears', genre: 'Pop', rating: 68, id: 4}
    ]);
  });

  afterEach(async () => {
    await database.raw('truncate table favorites cascade');
  });

  describe('test favorite DELETE', () => {
    it('happy path', async () => {
      const response = await request(app)
        .delete("/api/v1/favorites/2");

      expect(response.statusCode).toBe(204);
    });

    it('sad path', async () => {
      const response = await request(app)
        .delete("/api/v1/favorites/2");

      expect(response.statusCode).toBe(204);

      const response2 = await request(app)
        .delete("/api/v1/favorites/2");

      expect(response2.statusCode).toBe(404);

      expect(response2.body).toStrictEqual({"error": "Record not found"});

      const response3 = await request(app)
        .delete("/api/v1/favorites/chicken");

      expect(response3.statusCode).toBe(500);

      expect(response3.body).toStrictEqual({"error": "Request could not be handled"});
    });
  });
});
