const mongoose = require('mongoose');

const PeliculaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    director: { type: String, required: true },
    anioLanzamiento: { type: Number, required: true },
    productora: { type: String, required: true },
    precio: { type: Number, required: true }
});

module.exports = mongoose.model('Pelicula', PeliculaSchema);
