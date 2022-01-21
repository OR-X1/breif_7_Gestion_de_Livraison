const express = require('express');
// const morgan = require('morgan')
const router = express.Router();
const admin_genirale = require('../controllers/admin_genirale')

// routes admin_genirale
router.get('/', admin_genirale)
router.post('/login', admin_genirale)

module.exports = router;