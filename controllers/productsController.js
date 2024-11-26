const db = require('../config/db.js');


exports.getProduct = (req, res) => {
    const {category_id} = req.query; 
    // if (!category_id) {
    //     return res.status(400).json({ mensaje: 'El parametro category_id es requerido' });
    // }
    const sql = 'SELECT * FROM products ';
    db.query(sql,  (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta de la categoria', error: err });
        }
        if(results.length == 0){
            return res.status(404).json({ mensaje: 'No hay productos en esta categoría' });
        }
    
        db.query(sql, (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
            }
            res.json(results);
        });
    })
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
