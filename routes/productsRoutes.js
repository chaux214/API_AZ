const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController.js');


router.get('/', productsController.obtenerProduct);


router.post('/', productsController.crearProduct);

module.exports = router;