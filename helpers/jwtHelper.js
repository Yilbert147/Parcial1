const jwt = require('jsonwebtoken');
const secret = "mySecretKey"; // Cambiar a algo más seguro

// Función para generar un token para el usuario
exports.generarTokenUsuario = (usuario) => {
    return jwt.sign({ id: usuario._id, rol: usuario.rol }, secret, { expiresIn: '1h' });
};

// Middleware para verificar el token
exports.verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).send({ message: 'Acceso no autorizado' });

    try {
        const payload = jwt.verify(token.split(' ')[1], secret);
        req.user = payload; // Guardar el payload en la solicitud
        next(); // Continuar al siguiente middleware o ruta
    } catch (error) {
        return res.status(401).send({ message: 'Token inválido' });
    }
};
