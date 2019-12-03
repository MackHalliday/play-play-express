var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('Test the favorite path', () => {
  beforeEach(async () => {
    await database.raw('truncate table favorites cascade');

    let favorite = {
      title: 'Wannabe',
      artistName: 'Spice Girls',
      rating: 98,
      genre: "Pop"
    };
    await database('favorites').insert(favorite, 'id');
  });

  afterEach(() => {
    database.raw('truncate table favorites cascade');
  });

  describe('test favorite GET', () => {
    it('happy path', async () => {
      const res = await request(app)
        .get("/api/v1/favorites");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);

      expect(res.body[0]).toHaveProperty('title');
      expect(res.body[0].title).toBe('Wannabe');

      expect(res.body[0]).toHaveProperty('artistName');
      expect(res.body[0].artistName).toBe('Spice Girls');

      expect(res.body[0]).toHaveProperty('rating');
      expect(res.body[0].rating).toBe(98);

      expect(res.body[0]).toHaveProperty('rating');
      expect(res.body[0].genre).toBe('Pop');
    });
  });
});
