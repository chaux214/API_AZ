const db = require('../config/db');


exports.getCategory = (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};


exports.postCategory = (req, res) => {
    const {category_name, description, creation_date, update_date, status} = req.body;

    if (!category_name || !description || !creation_date  || !update_date  || !status) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevaCategory = { category_name, description, creation_date, update_date, status };

    const sql = 'INSERT INTO categories SET ?';
    db.query(sql, nuevaCategory, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar la categoría', error: err });
        }
        res.status(201).json({ mensaje: 'Categoría agregada con éxito', category_id: resultado.insertId });
    });
};


// Actualizar una categoria 
exports.putCategory = (req, res) => {
    const { id } = req.params; 
    const { category_name, description,creation_date, update_date, status } = req.body;

    if (!category_name|| !description || !creation_date || !update_date || !status) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios para actualizar la categoria' });
    }

    const sql = `UPDATE categories SET category_name = ?, description = ?, creation_date = ?, update_date = ?, status = ? WHERE category_id = ?`;

    db.query(sql, [category_name, description, creation_date, update_date, status, id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al actualizar la categoria', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Categoria no encontrada' });
        }
        res.json({ mensaje: 'Categoria actualizada con éxito' });
    });
};

// Eliminar una categoria
exports.deleteCategory = (req, res) => {
    const { id } = req.params;  // Obtener el id del categoria a eliminar

    const sql = `DELETE FROM categories WHERE category_id = ?`;

    db.query(sql, [id], (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al eliminar la categoria', error: err });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Categoria no encontrada' });
        }
        res.json({ mensaje: 'Categoria eliminada con éxito' });
    });
};

