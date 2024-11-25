const db = require('../config/db');


exports.obtenerCustomers = (req, res) => {
    const sql = 'SELECT customer_id, first_name, last_name, email, phone, address,registration_date,status FROM customers'; 
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};


exports.crearCustomer = (req, res) => {
    const { first_name, last_name,  email, phone, address, registration_date, status} = req.body; 

        if ( !first_name || !last_name || !email || !phone || !address  || ! registration_date || !status) {
             return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevoCustomer = { first_name, last_name, email,  phone, address, registration_date, status };

    const sql = 'INSERT INTO customers SET ?';
    db.query(sql, nuevoCustomer, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar al nuevo customer', error: err });
        }

        res.status(201).json({ mensaje: 'Customer agregado con éxito', customers_id: resultado.insertId });
    });
};
/*
// Actualizar un cliente
exports.actualizarCustomer = (req, res) => {
    const { id } = req.params; 
    const { first_name, last_name, email, phone, address, registration_date, status } = req.body;

    if (!first_name || !last_name || !email || !phone || !address || !registration_date || !status) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    const sql = `UPDATE customers SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, registration_date = ?, status = ? WHERE customer_id = ?`;

    db.query(sql, [first_name, last_name, email, phone, address, registration_date, status,id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al actualizar el cliente', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente actualizado con éxito' });
    });
};

// Eliminar un clinte
exports.eliminarCustomer = (req, res) => {
    const { id } = req.params;  // Obtener el id del cliente a eliminar

    const sql = `DELETE FROM customers WHERE customer_id = ?`;

    db.query(sql, [id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al eliminar el cliente', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente eliminado con éxito' });
    });
};
*/