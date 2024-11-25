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
    const { customer_id, payment_type, payment_details } = req.body;

    if (!customer_id || !payment_type || !payment_details) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevoPaymentmethod = { customer_id, payment_type, payment_details };

    const sql = 'INSERT INTO paymentmethod SET ?';
    db.query(sql, nuevoPaymentmethod, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar el método de pago', error: err });
        }
        res.status(201).json({ mensaje: 'Método de pago agregado con éxito', paymentmethod_id: resultado.insertId });
    });
};

/*
// Actualizar un producto
exports.actualizarPaymentmethod = (req, res) => {
    const { id } = req.params; 
    const { payment_type, payment_details,} = req.body;

    if (!payment_type || payment_details) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    const sql = `UPDATE paymentmethod SET payment_type = ?, payment_details = ? WHERE payment_id = ?`;

    db.query(sql, [payment_type, payment_details, id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al actualizar el metodo de pago', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Metodo de pago no encontrado' });
        }
        res.json({ mensaje: 'Metodo de pago  actualizado con éxito' });
    });
};
*/
// Eliminar un producto
exports.eliminarPaymentmethod = (req, res) => {
    const { id } = req.params;  // Obtener el id del metodo de pago a eliminar

    const sql = `DELETE FROM paymentmethod WHERE payment_id = ?`;

    db.query(sql, [id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al eliminar el metodo dd pago', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Metodo de pago no encontrado' });
        }
        res.json({ mensaje: 'Metodo de pago eliminado con éxito' });
    });
};
