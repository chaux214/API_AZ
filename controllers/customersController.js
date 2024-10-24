const db = require('../config/db');


exports.obtenerCustomers = (req, res) => {
    const sql = 'SELECT customers_id, first_name, last_name, email, phone, address,regristation_date,status FROM customers'; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};


exports.crearCustomer = (req, res) => {
    const { customers_id, first_name, last_name,  email, phone, address, registration_date, status} = req.body; 

    if (!customers_id  || ! first_name || !last_name || !email || !phone || !address  || ! registration_date || !status) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevoCustomer = { customers_id,  first_name, last_name, emial,  phone, address, registration_date, status };

    const sql = 'INSERT INTO customers SET ?';
    db.query(sql, nuevoCustomer, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar al nuevo customer', error: err });
        }

        res.status(201).json({ mensaje: 'Customer agregado con éxito', customers_id: resultado.insertId });
    });
};
