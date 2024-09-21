"use strict";

const Usuario = require("../models/usuario"); // Asegúrate de que la ruta sea correcta
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Asegúrate de tener este paquete instalado

// Función para registrar un usuario
function registrarUsuario(req, res) {
    const parametros = req.body;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(parametros.password, salt);

    const nuevoUsuario = new Usuario({
        nombre: parametros.username, // Cambia según tu modelo
        email: parametros.email,
        rol: parametros.rol,
        password: password
    });

    nuevoUsuario.save().then(
        (usuarioGuardado) => {
            res.status(200).send({ message: "Usuario creado", usuario: usuarioGuardado });
        },
        (err) => {
            res.status(500).send({ message: "No se pudo crear el usuario" });
        }
    );
}

// Función para iniciar sesión
function iniciarSesion(req, res) {
    const parametros = req.body;

    Usuario.findOne({ email: parametros.email }).then(
        (usuarioEncontrado) => {
            if (!usuarioEncontrado) {
                return res.status(403).send({ message: "No existe usuario" });
            }

            if (bcrypt.compareSync(parametros.password, usuarioEncontrado.password)) {
                // Genera y envía el token
                const token = jwt.sign({ id: usuarioEncontrado._id, rol: usuarioEncontrado.rol }, 'tu_secreto', { expiresIn: '1h' });
                return res.status(200).send({ message: "Login exitoso", token: token });
            } else {
                return res.status(403).send({ message: "Credenciales incorrectas" });
            }
        },
        (err) => {
            res.status(500).send({ message: "No se pudo validar el usuario" });
        }
    );
}

module.exports = {
    registrarUsuario,
    iniciarSesion
};
