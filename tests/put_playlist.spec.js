var shell = require('shelljs');
var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('test playlists PUT', () => {
  beforeEach(async () => {
    await database.raw('truncate table playlists cascade');

    await database('playlists').insert([
      {title: '80s Rock', id: 1},
      {title: 'Chill Mix', id: 2},
      {title: 'Jazz Playlist', id: 3},
      {title: 'EDM Playlist', id: 4}
    ]);
  });

  afterEach(async () => {
    await database.raw('truncate table playlists cascade');
  });

  it('user can update a playlist', async () => {
    let body = {
      title: "Punk Rock Playlist"
    };
    let response = await request(app)
      .put("/api/v1/playlists/1")
      .send(body);

    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toHaveProperty('title');
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('created_at');
    expect(response.body[0]).toHaveProperty('updated_at');

    expect(response.body[0].title).toEqual('Punk Rock Playlist');

    let playlist = await database('playlists').where({ id: 1})
    expect(playlist[0].title).toEqual('Punk Rock Playlist');
  });

  it('user cannot update playlist with the same title', async () => {
    let body = {
      title: "Punk Rock Playlist"
    };
    await request(app)
      .put("/api/v1/playlists/1")
      .send(body);

      let body2 = {
        title: "Punk Rock Playlist"
      };
      let response = await request(app)
        .post("/api/v1/playlists")
        .send(body2);

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual('Please enter a unique title');
  });

  it('user cannot update playlist without including title in body or request', async () => {
    let body = {
      titl: "Elevator Jazz Playlist"
    };
    let response = await request(app)
      .put("/api/v1/playlists/1")
      .send(body);
    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual('You must include a title parameter in the request');
  });

  it('user cannot update playlist with blank title in body or request', async () => {
    let body = {
      title: ""
    };
    let response = await request(app)
      .put("/api/v1/playlists/1")
      .send(body);
    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual('Title cannot be blank');
  });

  it('user cannot update playlist with blank title in body or request', async () => {
    let body = {
      title: ""
    };
    let response = await request(app)
      .put("/api/v1/playlists/100000")
      .send(body);
    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual('Please enter a valid id');
  });
});
