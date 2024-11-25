const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.js');


router.get('/', productsController.obtenerProduct);

router.get('/:urlSlug', productsController.getByUrlSlug);

router.post('/', productsController.crearProduct);


router.put('/:id', productsController.actualizarProduct);

// Ruta para eliminar un producto por ID
router.delete('/:id', productsController.eliminarProduct);

module.exports = router;