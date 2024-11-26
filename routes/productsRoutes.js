const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.js');


router.get('/', productsController.getProduct);

router.get('/:urlSlug', productsController.getByUrlSlug);

router.post('/', productsController.postProduct);


router.put('/:id', productsController.putProduct);

// Ruta para eliminar un producto por ID
router.delete('/:id', productsController.deleteProduct);

module.exports = router;