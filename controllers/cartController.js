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
    const { cart_id, customer_id, product_id, quantity, date } = req.body;

    if (!cart_id || !customer_id || !product_id || !quantity ||  !date) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevoCart = { cart_id, customer_id, product_id, quantity, date };

    const sql = 'INSERT INTO cart SET ?';
    db.query(sql, nuevoCart, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar el carrito', error: err });
        }
        res.status(201).json({ mensaje: 'Carrito agregado con éxito', cart_id: resultado.insertId });
    });
};
