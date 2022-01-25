const express = require('express');
// const morgan = require('morgan')
const router = express.Router();
const manager = require('../controllers/manager')

// routes admin_genirale
router.get('/getAll_managers', manager.getAll_managers)
router.get('/:id', manager.getmanager)
// router.post('/', manager.getAdmin)
router.post('/create_manager', manager.create_manager)


// router.get('/getAll_vehicule', manager.getAll_vehicule)
// router.post('/create_vehicule', manager.create_vehicule)

router.post('/login', manager.login)

module.exports = router;