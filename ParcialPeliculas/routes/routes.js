'use strict';

var express = require('express');
var authenticationController = require('../Controllers/authController'); // Asegúrate de que la ruta sea correcta

var routes = express.Router();

// Ruta para crear un usuario
routes.post('/api/usuario', authenticationController.registrarUsuario);

// Ruta para iniciar sesión
routes.post('/api/login', authenticationController.iniciarSesion);

// Puedes agregar más rutas aquí según sea necesario

module.exports = routes;
