const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController.js');

router.get('/', cartController.obtenerCart);
router.post('/', cartController.crearCart);

router.put('/:id', cartController.actualizarCart);
// Ruta para eliminar un producto por ID
router.delete('/:id', cartController.eliminarCart); 

module.exports = router;
