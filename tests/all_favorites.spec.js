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
      {title: 'The Chain', artistName: 'Fleetwood Mac', genre: 'Rock', rating: 52},
      {title: 'Truth Hurts', artistName: 'Lizzo', genre: 'Pop', rating: 40},
      {title: 'Baby One More Time', artistName: 'Britney Spears', genre: 'Pop', rating: 91},
      {title: 'Toxic', artistName: 'Britney Spears', genre: 'Pop', rating: 68}
    ]);
  });

  afterEach(() => {
    database.raw('truncate table favorites cascade');
  });

  describe('test favorites GET', () => {
    it('happy path', async () => {
      const response = await request(app)
        .get("/api/v1/favorites");

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(4);

      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('artistName');
      expect(response.body[0]).toHaveProperty('genre');
      expect(response.body[0]).toHaveProperty('rating');

      expect(response.body[0].title).toBe('The Chain');
      expect(response.body[0].artistName).toBe('Fleetwood Mac');
      expect(response.body[0].genre).toBe('Rock');
      expect(response.body[0].rating).toBe(52);
    });
  });
});
