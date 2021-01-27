'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();

api.get('/home', UserController.home);
api.get('/test', UserController.test);

api.post('/user', UserController.create);

module.exports = api;
