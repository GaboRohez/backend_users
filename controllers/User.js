'use strict'

var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');
var moment = require('moment');

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

function create(request, response){
  var params = request.body;
    var user = new User();

    if(params.name && params.surname && params.nick && params.email && params.password){
      user.name = params.name;
      user.surname = params.surname;
      user.nick = params.nick;
      user.email = params.email;
      user.image = null;
      user.created_at = moment().unix();

      //  control duplicate users
      User.find({$or: [
          {email: user.email.toLowerCase()},
          {nick: user.nick.toLowerCase()}
        ]}).exec((err, users) => {
          if(err) return response.status(500).send({ message: 'User request error' });
          if(users && users.length >= 1){
            return response.status(200).send({ code: "01", message: 'That email is already registered!.' });
          }else{
            bcrypt.hash(params.password, null, null, (err, hash) => {
              user.password = hash;
              user.save((err, userStored) => {
                if(err) return response.status(500).send({ message: 'Error to create user' });

                if(userStored){
                  response.status(200).send({ code: "00", message: 'User created' })
                }else{
                    response.status(404).send({ code: "03", message: 'User no register, try again later'})
                }

              });
            });
          }
        });

    }else{
      response.status(200).send({
        code: "01",
        mesaage: 'one or more data is incorrect, check your information.'
      });
    }
}

module.exports = {
  home,
  test,
  create
}
