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

function uploadImageProfile(request, response){

  var userId = request.params.id;

  if(request.files){
    var file_path = request.files.image.path;
    var file_split = file_path.split('\\');
    var file_name = file_split[2];
    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    //if(userId != request.user.sub) return removeFilesOfUploads(response, file_path, 'You do not have permission to update user data.');

    if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif'){
        User.findByIdAndUpdate(userId, {image: file_name}, {new: true}, (error, userUpdate) => {
          if(error) return response.status(500).send({ message: 'Request error'});

          if(!userUpdate) return response.status(500).send({ message: 'An error occurred, please try again later.' });

          return response.status(200).send({ code: "00", message: 'Updated profile picture' });
        });
    }else{
      return removeFilesOfUploads(response, file_path, 'Only png, jpg, jpeg and gif images are allowed.');
    }

  }else{
    return response.status(200).send({ code: "01", message: 'No images uploaded.' });
  }
}

function removeFilesOfUploads(response, file_path, message){
  fs.unlink(file_path, (err) => {
      return response.status(200).send({ code: "01", message: message });
  });
}

function getUser(request, response){

  var userId = request.params.id;

  User.findById(userId, (error, user) =>{

    if(error) return response.status(500).send({ code: "01", message: 'Request error'});

    if(!user) return response.status(404).send({ code: "02", message: 'User not found'});

    if(user) {
      user.password = undefined;
      user.__v = undefined;
      return response.status(200).send({ code: "00", message: 'Success', user });
    }
  });
}

function getUsers(request, response){

    User.find((error, users) => {
      if(error) return response.status(500).send({ message: 'Request error'});

      if(!users) return response.status(200).send({ code: "01", message: 'No registered users.'});

      users.forEach(function(user){
        user.password = undefined;
        user.__v = undefined;
      });

      return response.status(200).send({ code: "00", message: 'Success', users });
    });
}

function updateName(request, response) {

  var params = request.body;
  var userId = request.params.id;

  if(request.body){
      User.findByIdAndUpdate(userId, {name: params.name, surname: params.surname}, {new: true}, (error, userUpdate) => {
        if(error) return response.status(500).send({ message: 'Request error'});

        if(!userUpdate) return response.status(500).send({ message: 'An error occurred, please try again later.' });

        return response.status(200).send({ code: "00", message: 'User name updated.' });
      });
    }else{
      return response.status(200).send({ code: "01", message: 'Can&ampt send empty data.' });
    }
}

module.exports = {
  home,
  test,
  create,
  uploadImageProfile,
  getUser,
  getUsers,
  updateName
}
