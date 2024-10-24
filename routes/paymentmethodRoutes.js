const express = require('express');
const router = express.Router();
const paymentmethodController = require('../controllers/paymentmethodController.js');

router.get('/', paymentmethodController.obtenerPaymentmethod);
router.post('/', paymentmethodController.crearPaymentmethod);

module.exports = router;
