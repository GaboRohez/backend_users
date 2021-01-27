'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://root:bat91939@cluster0.ucwxe.mongodb.net/userstest?retryWrites=true&w=majority', { useMongoClient: true})
  .then(()=>{
    console.log("The connection to the database was successful.");
  })
  .catch(err => console.log(err));
