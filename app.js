'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//  cargar rutas
var user_routes = require('./routes/user');

//  middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.static('uploads'));
//  cors

//  rutas
app.use('/api', user_routes);

//  exportar
module.exports = app;
