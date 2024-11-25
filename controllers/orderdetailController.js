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
    const { order_id, product_id, quantity, price, unit_price } = req.body;

    if (!order_id || !product_id || !quantity  || !unit_price) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevoOrderdetail = { order_id, product_id, quantity, unit_price };

    const sql = 'INSERT INTO orderdetail SET ?';
    db.query(sql, nuevoOrderdetail, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar el detalle del pedido', error: err });
        }
        res.status(201).json({ mensaje: 'Detalle del pedido agregado con éxito', orderdetail_id: resultado.insertId });
    });
};


// Actualizar un detalle de pedido
exports.actualizarOrderdetail = (req, res) => {
    const { id } = req.params; 
    const {quantity, unit_price } = req.body;

    if (quantity || !unit_price) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    const sql = `UPDATE orderdetail SET  quantity = ?, unit_price = ?, WHERE detail_id = ?`;

    db.query(sql, [quantity, unit_price, id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al actualizar el detalle de la orden ', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Detalle de la orden  no encontrada' });
        }
        res.json({ mensaje: 'Detalle de la orden  actualizada con éxito' });
    });
};

// Eliminar un producto
exports.eliminarOrdendetail = (req, res) => {
    const { id } = req.params;  // Obtener el id del detalle del pedido a eliminar

    const sql = `DELETE FROM orderdetail WHERE detail_id = ?`;

    db.query(sql, [id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al eliminar el detalle de la orden', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'detalle de la orden no encontrada' });
        }
        res.json({ mensaje: 'detalle de la orden eliminada con éxito' });
    });
};
