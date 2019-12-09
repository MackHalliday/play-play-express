

# Play Play
[![Build Status](https://travis-ci.org/MackHalliday/play-play-express.svg?branch=master)](https://travis-ci.org/MackHalliday/play-play-express)

#### [Visit Production Application](https://play-play-express.herokuapp.com/)


## Table of Contents
 *  [Introduction](https://github.com/MackHalliday/play-play-express#introduction)
 *  [Initial Setup](https://github.com/MackHalliday/play-play-express#intial-setup)
 *  [How to Run Tests](https://github.com/MackHalliday/play-play-express#how-to-run-tests)
 *  [How to Use](https://github.com/MackHalliday/play-play-express#how-to-use)
 *  [Endpoints](https://github.com/MackHalliday/play-play-express/blob/master/README.md#endpoints)
 *  [Schema Design](https://github.com/MackHalliday/play-play-express#schema-design)
 *  [Tech Stack List](https://github.com/MackHalliday/play-play-express#tech-stack-list)
 *  [Core Contributors](https://github.com/MackHalliday/play-play-express#core-contributors)

## Introduction

* [Project Requirements](https://backend.turing.io/module4/projects/play/play_rubric)

* [GitHub Project Board](https://github.com/MackHalliday/play-play-express/projects/1)


 ## Intial Setup

 Follow the following steps to setup application locally. Setup time is 5-10 minutes.

#### Installing necessary dependencies
The easiest way to get started is to run the following command. This will pull down any necessary dependencies that your app will require.

`npm install`

#### Set up your local database
You’ll need to figure out a name for your database. We suggest calling it something like `play_play_express_dev`.  

To get things set up, you’ll need to access your Postgres instance by typing in `psql` into your terminal. Once there, you can create your database by running the comment `CREATE DATABASE PUT_DATABASE_NAME_HERE_dev;`.

#### Migrations
Once you have your database setup, you’ll need to run some migrations (if you have any). You can do this by running the following command:

`knex migrate:latest`


Instructions to create database, run migrations, and seed:
```
psql
CREATE DATABASE DATABASE_NAME_dev;
\q

knex migrate:latest
knex seed:run
```

#### Adding Environment Keys
Enviroment keys are required to use the Google Geocoding and DarkSky Service.

Obtain a [Musix Match API key](https://developer.musixmatch.com/)

Create an `.env` file in the root of the dictory

In the `.env` file, add the following information:

```
MUSIX_MATCH_API_KEY= your_musix_match_api_key
```

Add the `.env` to your .gitignore to avoid the file being pushed to GitHub

#### Set up your test database
Most of the setup is going to be same as the one you did before. You’ll notice one small difference with setting the environment flag to `test`.  

```
psql
CREATE DATABASE DATABASE_NAME_test;
\q

knex migrate:latest --env test
```

 ## How to Run Tests

 Running tests are simple and require you to run the following command below:

`npm test`

 ## How to Use

 Recommend using [Postman](https://www.getpostman.com/) to hit endpoints.

 ## Endpoints

 ### Root

Production address

``` https://play-play-express.herokuapp.com/```

Local address

``` http://localhost:3000/ ```

### Get All Favorite Tracks
Returns all favorite tracks from the database 

``` GET /api/v1/favorites ```

If successful, application will respond with status code 200 and JSON with array of tracks.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/6606e9d1f575ad52eb26)



### Get a Single Favorite Track
Returns a single favorite track from the database

``` GET /api/v1/favorites/:id ```

`:id`: id of desired favorite track

If successful, application will respond with status code 200 and JSON of requested track.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a375cfdc39665aae1257)



### Delete a Single Favorite Track
Delete a single favorite track from the database

``` DELETE /api/v1/favorites/:id ```

`:id`: id of the track to be deleted

If successful, application will respond with 201 status.



### Add a New Single Favorite Track
Add a new favorite track. The track title must be included in the POST request body. Including the track's artist is optional.

``` POST /api/v1/favorites ```

`title`: title of the desired track
`artist`: (optional) artist of the desired track

If successful, application will respond with 201 status and return JSON of newly posted record.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/a375cfdc39665aae1257)




### Get All Playlists
Returns all favorite tracks from the database 

``` GET /api/v1/playlists ```

If successful, application will respond with status code 200 and JSON with array of tracks.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/d23a9e30301997151b00)



### Add a New Playlist
Add a new playlist. A unique playlist title must be included in the POST request body.

``` POST /api/v1/playlists ```

`title`: title of playlist

If successful, application will respond with 201 status and return JSON of newly posted playlist record.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/af52ddc10e94fc7e9619)



### Update a  Playlist
Update a playlist. To update a playlist title, a unique playlist title must be included in the POST request body.

``` PUT /api/v1/playlists/:id ```

`title`: title of playlist

If successful, application will respond with 201 status and return JSON of newly posted playlist record.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3dd64ac83f0e7412506e)



### Delete a Single Playlist
Delete a single playlist from the database

``` DELETE /api/v1/playlists/:id ```

`:id`: id of the track to be deleted

If successful, application will respond with 201 status.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/dcb1f688a71d1e621483)


 ## Schema Design
 

 ## Tech Stack List
   *  [Node.js](https://nodejs.org/en/)
   *  [Knex](http://knexjs.org/)
   *  [PostgreSQL](https://www.postgresql.org/)
   *  [Node-Fetch](https://www.npmjs.com/package/node-fetch)

  ## Core Contributors
  
  ### [Joshua Sherwood](https://github.com/joshsherwood1)
   [View LinkedIn](https://www.linkedin.com/in/sherwoodjosh/)
  

  ### [Mack Halliday](https://github.com/MackHalliday)
   [View LinkedIn](https://www.linkedin.com/in/mackhalliday/)
  
 
