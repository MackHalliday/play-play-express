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
      {id: 1, title: 'The Chain', artistName: 'Fleetwood Mac', genre: 'Rock', rating: 52},
      {id: 2, title: 'Truth Hurts', artistName: 'Lizzo', genre: 'Pop', rating: 40},
      {id: 3, title: 'Baby One More Time', artistName: 'Britney Spears', genre: 'Pop', rating: 91},
      {id: 4, title: 'Toxic', artistName: 'Britney Spears', genre: 'Pop', rating: 68}
    ]);
  });

  afterEach(() => {
    database.raw('truncate table favorites cascade');
  });

  describe('test favorites POST', () => {
    it('happy path', async () => {
      const body = {
        title: "Coming of Age"
      };
      const response = await request(app)
        .post("/api/v1/favorites")
        .send(body);
      expect(response.statusCode).toBe(200);
      //
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('artistName');
      expect(response.body).toHaveProperty('genre');
      expect(response.body).toHaveProperty('rating');
      //
      // expect(response.body.title).toBe('The Chain');
      // expect(response.body.artistName).toBe('Fleetwood Mac');
      // expect(response.body.genre).toBe('Rock');
      // expect(response.body.rating).toBe(52);
    });

    it('sad path song not found', async () => {
      const body = {
        title: "asjdfioasjfoaj"
      };
      const response = await request(app)
        .post("/api/v1/favorites")
        .send(body);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('Song with that title could not be found');
    });
    //
    it('sad path title param not included in body', async () => {
      const body = {
        titl: "asjdfioasjfoaj"
      };
      const response = await request(app)
        .post("/api/v1/favorites")
        .send(body);

      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe('You must include a title parameter in the request');
    });
  });
});
