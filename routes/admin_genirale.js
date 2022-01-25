const express = require('express');
// const morgan = require('morgan')
const router = express.Router();
const admin_genirale = require('../controllers/admin_genirale')

// routes admin_genirale
router.get('/', admin_genirale.getAdmin)
// router.get('/getAll_managers', admin_genirale.getAll_managers)
// router.post('/create_manager', admin_genirale.create_manager)
router.post('/login', admin_genirale.login)

module.exports = router;