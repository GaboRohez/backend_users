'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

//  conexión databse
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://root:p45w0rd@cluster0.ucwxe.mongodb.net/userstest?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>{
    console.log("La conexión a base de datos se realizo correctamente");
    //  crear servidor
    app.listen(port, () =>{
      console.log("Servidor corriendo en http://localhost:3800");
    });
  })
  .catch(err => console.log(err));
