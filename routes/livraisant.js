const express = require('express');
// const morgan = require('morgan')
const router = express.Router();
const livraisant = require('../controllers/livraisant')


// router.get('/getAll_livraisant', livraisant.getAll_livraisant)
router.post('/create_livraisant', livraisant.create_livraisant)
router.get('/:status', livraisant.getlivraisant)


module.exports = router;