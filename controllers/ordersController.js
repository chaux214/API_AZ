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
    const { customer_id, tracking_id, date, total } = req.body;

    if (!customer_id || !tracking_id || !date || !total) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevaOrder = { customer_id, tracking_id, date, total};

    const sql = 'INSERT INTO orders SET ?';
    db.query(sql, nuevaOrder, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar la orden', error: err });
        }
        res.status(201).json({ mensaje: 'Orden agregada con éxito', order_id: resultado.insertId });
    });
};

// Actualizar un producto
exports.actualizarOrder = (req, res) => {
    const { id } = req.params; 
    const {date, total, } = req.body;

    if (!date || !total) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    const sql = `UPDATE orders SET date = ?, total = ? WHERE order_id = ?`;

    db.query(sql, [date, total,id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al actualizar la orden', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        }
        res.json({ mensaje: 'Orden actualizado con éxito' });
    });
};

// Eliminar un producto
exports.eliminarOrder = (req, res) => {
    const { id } = req.params;  // Obtener el id de la orden  a eliminar

    const sql = `DELETE FROM orders WHERE order_id = ?`;

    db.query(sql, [id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al eliminar la orden', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Orden no encontrada' });
        }
        res.json({ mensaje: 'Orden eliminada con éxito' });
    });
};

