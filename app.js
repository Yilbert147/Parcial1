'use strict';

var express = require("express");
var routes = require('./routes/routes'); // Verifica que la ruta sea correcta
var bodyParser = require("body-parser");

var app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes); // Usa las rutas definidas en routes.js

module.exports = app;
