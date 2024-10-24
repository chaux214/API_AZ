const db = require('../config/db');


exports.obtenerShippingaddresses = (req, res) => {
    const sql = 'SELECT * FROM shippingaddresses';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};


exports.crearShippingaddress = (req, res) => {
    const { address_id, customer_id, address, city, state, postal_code, country } = req.body;

    if (!address_id || !customer_id || !address || !city ||!state || !postal_code ||!country) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevaShippingaddress = { address_id, customer_id, address, city, state, postal_code, country };

    const sql = 'INSERT INTO shippingaddresses SET ?';
    db.query(sql, nuevaShippingaddress, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar la dirección de envío', error: err });
        }
        res.status(201).json({ mensaje: 'Dirección de envío agregada con éxito', shippingaddress_id: resultado.insertId });
    });
};
