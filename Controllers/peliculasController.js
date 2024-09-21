const Pelicula = require('../models/pelicula');
const jwtHelper = require('../helpers/jwtHelper');

// Crear una nueva película (solo para admin)
exports.crearPelicula = async (req, res) => {
    if (req.user.rol !== 'admin') {
        return res.status(403).send({ message: 'No tienes autorización para crear una película' });
    }

    const { titulo, director, anioLanzamiento, productora, precio } = req.body;
    try {
        const nuevaPelicula = new Pelicula({ titulo, director, anioLanzamiento, productora, precio });
        await nuevaPelicula.save();
        res.status(200).send({ message: 'Película creada exitosamente' });
    } catch (error) {
        res.status(500).send({ message: 'Error al crear película' });
    }
};

// Consultar todas las películas (solo usuarios autenticados)
exports.consultarPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.find();
        res.status(200).send(peliculas);
    } catch (error) {
        res.status(500).send({ message: 'Error al consultar películas' });
    }
};

// Consultar películas por año y precio
exports.consultarPeliculasPorParametros = async (req, res) => {
    const { anio, precio } = req.query;
    try {
        const peliculas = await Pelicula.find({
            anioLanzamiento: { $gt: anio },
            precio: { $lte: precio }
        });
        res.status(200).send(peliculas);
    } catch (error) {
        res.status(500).send({ message: 'Error al consultar películas' });
    }
};
