const express = require('express');
const router = express.Router();
const orderdetailController = require('../controllers/orderdetailController.js');

router.get('/', orderdetailController.obtenerOrderdetail);
router.post('/', orderdetailController.crearOrderdetail);

module.exports = router;
