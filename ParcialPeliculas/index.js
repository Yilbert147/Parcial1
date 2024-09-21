const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect("mongodb://127.0.0.1:27017/peliculas")
.then(() => {
    console.log('Conexión exitosa a MongoDB');
    app.listen(3000, () => {
        console.log('Servidor corriendo en puerto 3000');
    });
}).catch((error) => {
    console.log('Error conectando a MongoDB', error);
});



