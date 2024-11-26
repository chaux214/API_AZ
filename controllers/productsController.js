const db = require('../config/db.js');

exports.getProduct = (req, res) => {
    const { category_id } = req.query; // Obtenemos el parámetro de la consulta

    // Si no se pasa `category_id`, seleccionamos todos los productos
    const sql = category_id 
        ? 'SELECT * FROM products p JOIN categories c ON p.category_id = c.category_id WHERE c.urlSlug = ?' 
        : 'SELECT * FROM products';

    const queryParams = category_id ? [category_id] : []; // Parámetros para la consulta

    db.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ mensaje: category_id 
                ? 'No hay productos en esta categoría' 
                : 'No hay productos disponibles' });
        }

        res.json(results); // Devolvemos los resultados
    });
};

exports.getByUrlSlug = (req, res) => {
    const urlSlug = req.params.urlSlug; // Extrae el parámetro de la URL
    const sql = 'SELECT * FROM products WHERE urlSlug = ?'; // Consulta para buscar por urlSlug

    db.query(sql, [urlSlug], (err, result) => {
        if (err) {
            console.error('Error al buscar el producto:', err);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(result[0]); // Devuelve el primer producto encontrado
    });
};

exports.postProduct = (req, res) => {
    const { urlSlug,product_name, description, price, stock_quantity, category_id, creation_date, update_date, image_url, status } = req.body;

    if (!urlSlug || !product_name || !description || !price || !stock_quantity || !category_id || !creation_date || !update_date || !image_url || !status) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const productnew = {urlSlug, product_name, description, price, stock_quantity, category_id, creation_date, update_date, image_url, status };

    const sql = 'INSERT INTO products SET ?';
    db.query(sql, productnew, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar el producto', error: err });
        }
        res.status(201).json({ mensaje: 'Producto agregado con éxito', productoId: resultado.insertId });
    });
};

// Actualizar un producto
exports.putProduct = (req, res) => {
    const { id } = req.params; 
    const {urlSlug, product_name, description, price, stock_quantity, update_date, image_url, status } = req.body;

    if (!urlSlug || !product_name || !description || !price || !stock_quantity || !update_date || !image_url || !status) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar' });
    }

    const sql = `UPDATE products SET  urlSlug =?, product_name = ?, description = ?, price = ?, stock_quantity = ?, update_date = ?, image_url = ?, status = ? WHERE product_id = ?`;

    db.query(sql, [ urlSlug, product_name, description, price, stock_quantity, update_date, image_url, status, id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al actualizar el producto', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto actualizado con éxito' });
    });
};

// Eliminar un producto
exports.deleteProduct = (req, res) => {
    const { id } = req.params;  // Obtener el id del producto a eliminar

    const sql = `DELETE FROM products WHERE product_id = ?`;

    db.query(sql, [id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al eliminar el producto', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto eliminado con éxito' });
    });
};
