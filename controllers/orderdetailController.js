const db = require('../config/db');

exports.obtenerOrderdetail = (req, res) => {
    const sql = 'SELECT * FROM orderdetail';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};


exports.crearOrderdetail = (req, res) => {
    const { detail_id, order_id, product_id, quantity, price, unit_price } = req.body;

    if (!detail_id || !order_id || !product_id || !quantity  || !unit_price) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevoOrderdetail = { detail_id, order_id, product_id, quantity, unit_price };

    const sql = 'INSERT INTO orderdetail SET ?';
    db.query(sql, nuevoOrderdetail, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar el detalle de orden', error: err });
        }
        res.status(201).json({ mensaje: 'Detalle de orden agregado con éxito', orderdetail_id: resultado.insertId });
    });
};
