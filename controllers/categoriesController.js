const db = require('../config/db');


exports.obtenerCategories = (req, res) => {
    const sql = 'SELECT * FROM categories';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ mensaje: 'Error en la consulta a la base de datos', error: err });
        }
        res.json(results);
    });
};


exports.crearCategory = (req, res) => {
    const { category_id, category_name, description, creation_date, update_date, status} = req.body;

    if (!category_id || !category_name || !description || !creation_date  || !update_date  || !status) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevaCategory = { category_id, category_name, description, creation_date, update_date, status };

    const sql = 'INSERT INTO categories SET ?';
    db.query(sql, nuevaCategory, (err, resultado) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al agregar la categoría', error: err });
        }
        res.status(201).json({ mensaje: 'Categoría agregada con éxito', category_id: resultado.insertId });
    });
};
