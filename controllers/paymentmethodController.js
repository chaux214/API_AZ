const db = require('../config/db');


exports.obtenerPaymentmethod = (req, res) => {
    const sql = 'SELECT * FROM paymentmethod';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};


exports.crearPaymentmethod = (req, res) => {
    const { payment_id, customer_id, payment_type, payment_details } = req.body;

    if (!payment_id || !customer_id || !payment_type || !payment_details) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevoPaymentmethod = { payment_id, customer_id, payment_type, payment_details };

    const sql = 'INSERT INTO paymentmethod SET ?';
    db.query(sql, nuevoPaymentmethod, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar el método de pago', error: err });
        }
        res.status(201).json({ mensaje: 'Método de pago agregado con éxito', paymentmethod_id: resultado.insertId });
    });
};
