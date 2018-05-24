const express = require('express');
const homeController = require('../../controllers/api/v1/homeController');

const router = express.Router();

router.get('/', homeController.index);

module.exports = router;