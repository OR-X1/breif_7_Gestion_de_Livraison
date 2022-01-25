const express = require('express');
// const morgan = require('morgan')
const router = express.Router();
const livraisant = require('../controllers/livraisant')


// router.get('/getAll_livraisant', livraisant.getAll_livraisant)
// router.get('/:id', livraisant.getlivraisant)
router.post('/create_livraisant', livraisant.create_livraisant)
// routes admin_genirale
// router.get('/:id', manager.getmanager)
// router.post('/', manager.getAdmin)
// router.get('/getAll_responsableLivraison/:id', manager.getAll_responsableLivraison)
// router.post('/create_responsableLivraison', manager.create_responsableLivraison)


module.exports = router;