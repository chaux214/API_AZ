const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController.js');

router.get('/', categoriesController.getCategory);
router.post('/', categoriesController.postCategory);

router.put('/:id',categoriesController.putCategory)
router.delete('/:id',categoriesController.deleteCategory);
module.exports = router;
