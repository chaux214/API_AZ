const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController.js');

router.get('/', ordersController.obtenerOrders);
router.post('/', ordersController.crearOrder);

module.exports = router;
