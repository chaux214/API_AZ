const db = require('../config/db.js');


exports.obtenerProduct = (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};


exports.crearProduct = (req, res) => {
    const { product_id, product_name, description, price, stock_quantity, category_id, creation_date, update_date, image_url, status } = req.body; 

    if (!product_id || !product_name || !description || !price || !stock_quantity || !category_id ||!creation_date || !update_date || !image_url ||!status) { 
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const productnew = { product_id, product_name, description, price, stock_quantity, category_id, creation_date, update_date, image_url, status }; 

    const sql = 'INSERT INTO products SET ?';
    db.query(sql, productnew, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar el producto', error: err });
        }
        res.status(201).json({ mensaje: 'Producto agregado con éxito', productoId: resultado.insertId });
    })};
