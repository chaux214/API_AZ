const mysql = require('mysql');
require('dotenv').config(); // Cargar variables de entorno desde .env

// Crear la conexión con Azure MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST, // Nombre de dominio del servidor
    user: process.env.DB_USER, // Usuario administrador
    password: process.env.DB_PASSWORD, // Contraseña configurada en Azure
    database: process.env.DB_NAME, // Nombre de tu base de datos
    port: process.env.DB_PORT, // Puerto predeterminado de MySQL
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false // Configuración SSL
});

// Probar la conexión
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL en Azure');
});

module.exports = db;
