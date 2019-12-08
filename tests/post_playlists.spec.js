var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


describe('test playlists POST', () => {
  beforeEach(async () => {
    await database.raw('truncate table playlists cascade');
  });

  afterEach(() => {
    database.raw('truncate table playlists cascade');
  });
  it('user can create a playlist', async () => {
    let body = {
      title: "Chicken Dance Party"
    };
    let response = await request(app)
      .post("/api/v1/playlists")
      .send(body);

    expect(response.statusCode).toBe(201);

    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('created_at');
    expect(response.body[0]).toHaveProperty('updated_at');

    expect(response.body[0].title).toBe('Chicken Dance Party');

    let lastCreatedPlaylist = await database('playlists').orderBy('created_at', 'desc').first()

    expect(lastCreatedPlaylist.title).toBe('Chicken Dance Party');

  });

  it('user cannot create playlist with the same title', async () => {
    let body = {
      title: "Chicken Dance Party"
    };
    await request(app)
      .post("/api/v1/playlists")
      .send(body);

      let body2 = {
        title: "Chicken Dance Party"
      };
      let response = await request(app)
        .post("/api/v1/playlists")
        .send(body2);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Please enter a unique title');
  });

  it('user cannot create playlist without including title in body or request', async () => {
    let body = {
      titl: "Elevator Jazz Playlist"
    };
    let response = await request(app)
      .post("/api/v1/playlists")
      .send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('You must include a title parameter in the request');
  });

  it('user cannot create playlist with blank title in body or request', async () => {
    let body = {
      title: ""
    };
    let response = await request(app)
      .post("/api/v1/playlists")
      .send(body);
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Title cannot be blank');
  });
});
