var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('test favorites POST', () => {
  beforeEach(async () => {
    await database.raw('truncate table favorites cascade');
    await database('favorites').insert([
      {id: 1, title: 'The Chain', artistName: 'Fleetwood Mac', genre: 'Rock', rating: 52},
      {id: 2, title: 'Truth Hurts', artistName: 'Lizzo', genre: 'Pop', rating: 40},
      {id: 3, title: 'Baby One More Time', artistName: 'Britney Spears', genre: 'Pop', rating: 91},
      {id: 4, title: 'Toxic', artistName: 'Britney Spears', genre: 'Pop', rating: 68}
    ]);
  })

  afterEach(async () => {
    await database.raw('truncate table favorites cascade');
  })

  it('happy path', async () => {
    const body = {
      title: "Coming of Age"
    };
    const response = await request(app)
      .post("/api/v1/favorites")
      .send(body);
    expect(response.statusCode).toBe(201);

    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('artistName');
    expect(response.body[0]).toHaveProperty('genre');
    expect(response.body[0]).toHaveProperty('rating');

    expect(response.body[0].title).toBe('Coming of Age');

    let lastRecord = await database('favorites').orderBy('created_at', 'desc').first()
  .columns('id', 'title', 'artistName', 'genre', 'rating')

    expect(lastRecord.title).toBe('Coming of Age');
    expect(lastRecord.artistName).toBe('Foster the People');
    expect(lastRecord.genre).toBe('Alternative');

  });

  it('happy path with artist', async () => {
    const body = {
      title: "White Christmas",
      artist: "Bing Crosby"
    };
    const response = await request(app)
      .post("/api/v1/favorites")
      .send(body);
    expect(response.statusCode).toBe(201);

    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('artistName');
    expect(response.body[0]).toHaveProperty('genre');
    expect(response.body[0]).toHaveProperty('rating');

    expect(response.body[0].title).toBe('White Christmas');
    expect(response.body[0].artistName).toBe('Bing Crosby');

    let lastRecord = await database('favorites').orderBy('created_at', 'desc').first()
  .columns('id', 'title', 'artistName', 'genre', 'rating')

    expect(lastRecord.title).toBe('White Christmas');
    expect(lastRecord.artistName).toBe('Bing Crosby');
    expect(lastRecord.genre).toBe('Holiday');

  })
  it('sad path song not found', async () => {
    const body = {
      title: "asjdfioasjfoaj"
    };
    const response = await request(app)
      .post("/api/v1/favorites")
      .send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Record not created. Song with that title could not be found');
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
