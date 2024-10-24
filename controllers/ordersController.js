const db = require('../config/db');

// Obtener todas las órdenes
exports.obtenerOrders = (req, res) => {
    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};


exports.crearOrder = (req, res) => {
    const { order_id, customer_id, tracking_id, date, total } = req.body;

    if (!order_id || !customer_id || !tracking_id || !date || !total) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevaOrder = { order_id, customer_id, tracking_id, date, total};

    const sql = 'INSERT INTO orders SET ?';
    db.query(sql, nuevaOrder, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar la orden', error: err });
        }
        res.status(201).json({ mensaje: 'Orden agregada con éxito', order_id: resultado.insertId });
    });
};

