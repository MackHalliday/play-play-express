

# Play Play

#### [Visit Production Application](https://play-play-express.herokuapp.com/)

## Table of Contents
 *  [Introduction](https://github.com/MackHalliday/play-play-express#introduction)
 *  [Initial Setup](https://github.com/MackHalliday/play-play-express#intial-setup)
 *  [How to Run Tests](https://github.com/MackHalliday/play-play-express#how-to-run-tests)
 *  [How to Use](https://github.com/MackHalliday/play-play-express#how-to-use)
    * [Endpoints](https://github.com/MackHalliday/play-play-express/blob/master/README.md#endpoints)
 *  [Schema Design](https://github.com/MackHalliday/play-play-express#schema-design)
 *  [Tech Stack List](https://github.com/MackHalliday/play-play-express#tech-stack-list)
 *  [Core Contributors](https://github.com/MackHalliday/play-play-express#core-contributors)

## Introduction

* [Project Requirements]()

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

Obtain a [Musix Match API key]()

Create an `.env` file in the root of the dictory

In the `.env` file, add the following information:

```
MUSIX_MATCH_API_KEY= your_google_api_key
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

 Recommend using [Postman](https://www.getpostman.com/) to hit endpoints. All endpoint begin with the root address and require a valid `api_key` in the body.

 There are three valid api_key seeded in the database: `123`, `456`, and `789`.

 ### Endpoints

 #### Root

Production address

``` https://play-play-express.herokuapp.com/```

Local address

``` http://localhost:3000/ ```

#### Example Endpoint
Include what the endpoint does

``` GET /api/v1/example_point```

 ``` body:
   {
     "api_key": "YOUR_API_KEY"
   }
```

```params_varible```: what varible does

[![Run in Postman]()


 ## Schema Design
 
 Include scheme design

 ## Tech Stack List
   *  [Node.js](https://nodejs.org/en/)
   *  [Knex](http://knexjs.org/)
   *  [PostgreSQL](https://www.postgresql.org/)
   *  [Node-Fetch](https://www.npmjs.com/package/node-fetch)

  ## Core Contributors
  
   #### [Joshua Sherwood](https://github.com/joshsherwood1)
   **[View LinkedIn](https://www.linkedin.com/in/sherwoodjosh/)**
  

  #### [Mack Halliday](https://github.com/MackHalliday)
   **[View LinkedIn](https://www.linkedin.com/in/mackhalliday/)**
  
 
