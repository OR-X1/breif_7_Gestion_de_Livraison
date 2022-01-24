const express = require('express');
// const morgan = require('morgan')
const router = express.Router();
const manager = require('../controllers/manager')

// routes admin_genirale
router.get('/:id', manager.getmanager)
// router.post('/', manager.getAdmin)
router.get('/getAll_responsableLivraison/:id', manager.getAll_responsableLivraison)
router.post('/create_responsableLivraison', manager.create_responsableLivraison)

router.get('/getAll_chauffeur', manager.getAll_chauffeur)
router.post('/create_chauffeur', manager.create_chauffeur)

// router.get('/getAll_vehicule', manager.getAll_vehicule)
// router.post('/create_vehicule', manager.create_vehicule)

router.post('/login', manager.login)

module.exports = router;