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
api.get('/user/:id', UserController.getUser);
api.get('/users/', UserController.getUsers);
api.put('/name/:id', UserController.updateName);
api.put('/email', UserController.updateEmail);
api.delete('/user/:id', UserController.deleteUser);

module.exports = api;
