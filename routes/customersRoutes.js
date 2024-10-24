const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customersController.js');

router.get('/', customersController.obtenerCustomers);

router.post('/', customersController.crearCustomer);

module.exports = router;
