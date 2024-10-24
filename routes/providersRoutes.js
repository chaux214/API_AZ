const express = require('express');
const router = express.Router();
const providersController = require('../controllers/providersController.js');

router.get('/', providersController.obtenerProviders);
router.post('/', providersController.crearProvider);

module.exports = router;
