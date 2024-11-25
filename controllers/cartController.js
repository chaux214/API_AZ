const db = require('../config/db');

// Obtener todos los carritos
exports.obtenerCart = (req, res) => {
    const sql = 'SELECT * FROM cart';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};

// Crear un nuevo carrito
exports.crearCart = (req, res) => {
    const {customer_id, product_id, quantity, date } = req.body;

    if (!customer_id || !product_id || !quantity ||  !date) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevoCart = {customer_id, product_id, quantity, date };

    const sql = 'INSERT INTO cart SET ?';
    db.query(sql, nuevoCart, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar el carrito', error: err });
        }
        res.status(201).json({ mensaje: 'Carrito agregado con éxito', cart_id: resultado.insertId });
    });
};


// Actualizar un carrito
exports.actualizarCart = (req, res) => {
    const { id } = req.params; 
    const {quantity,date} = req.body;

    if (!quantity|| !date) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    const sql = `UPDATE cart SET quantity = ?, date = ? WHERE cart_id = ?`;

    db.query(sql, [quantity, date, id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al actualizar el carrito', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado' });
        }
        res.json({ mensaje: 'Carrito actualizado con éxito' });
    });
};

// Eliminar un carrito
exports.eliminarCart = (req, res) => {
    const { id } = req.params;  // Obtener el id del carrito a eliminar

    const sql = `DELETE FROM cart WHERE card_id = ?`;

    db.query(sql, [id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al eliminar el carrito', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Carrito no encontrado' });
        }
        res.json({ mensaje: 'Carrito eliminado con éxito' });
    });
};
