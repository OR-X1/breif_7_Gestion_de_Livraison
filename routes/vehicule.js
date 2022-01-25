const express = require('express');
// const morgan = require('morgan')
const router = express.Router();
const vehicule = require('../controllers/vehicule')


router.get('/getAll_vehicule', vehicule.getAll_vehicule)
router.get('/:id', vehicule.getvehicule)
router.post('/create_vehicule', vehicule.create_vehicule)
// routes admin_genirale
// router.get('/:id', manager.getmanager)
// router.post('/', manager.getAdmin)
// router.get('/getAll_responsableLivraison/:id', manager.getAll_responsableLivraison)
// router.post('/create_responsableLivraison', manager.create_responsableLivraison)


module.exports = router;