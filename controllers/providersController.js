const db = require('../config/db');


exports.obtenerProviders = (req, res) => {
    const sql = 'SELECT * FROM providers';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};


exports.crearProvider = (req, res) => {
    const { provider_id, name, contact, phone, email, address, city, state, country, registration_date, provider_status} = req.body;

    if (!provider_id || !name || !contact || !phone  ||!email ||!address ||!city ||!state ||!country ||!registration_date ||!provider_status ) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevoProvider = { provider_id, name_provider, contact_name, phone, email, address, city, state, country, registration_date, provider_status };

    const sql = 'INSERT INTO providers SET ?';
    db.query(sql, nuevoProvider, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar el proveedor', error: err });
        }
        res.status(201).json({ mensaje: 'Proveedor agregado con éxito', provider_id: resultado.insertId });
    });
};
