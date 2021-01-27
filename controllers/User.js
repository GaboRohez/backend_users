'use strict'

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

var User = require('../models/user');

function home(request, response) {
  response.status(200).send({
    message: 'Hello world from NodeJS server'
  });
}

function test (request, response){
  response.status(200).send({
    message: 'Test action from server NodeJS'
  });
}

module.exports = {
  home,
  test
}
