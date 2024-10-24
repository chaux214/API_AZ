const express = require('express');
const router = express.Router();
const shippingaddressesController = require('../controllers/shippingaddressesController.js');

router.get('/', shippingaddressesController.obtenerShippingaddresses);
router.post('/', shippingaddressesController.crearShippingaddress);

module.exports = router;
