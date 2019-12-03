var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

const MusixMatchService = require('../../../services/musix_match_service.js');
const musixMatchService = new MusixMatchService();

router.get('/', async function (request, response) {
  let service = await musixMatchService.getSongData("baby got back")
  response.status(200).json(service)
});

module.exports = router;
