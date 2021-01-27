'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});

var api = express.Router();

api.get('/home', UserController.home);
api.get('/test', UserController.test);

api.post('/user', UserController.create);
api.post('/user/image/:id', md_upload, UserController.uploadImageProfile);

module.exports = api;
