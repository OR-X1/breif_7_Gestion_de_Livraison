const express = require('express');
// const morgan = require('morgan')
const router = express.Router();
const responsableLivraison = require('../controllers/responsableLivraison')

// routes admin_genirale
// router.get('/:id', manager.getmanager)
// router.post('/', manager.getAdmin)
// router.get('/getAll_responsableLivraison/:id', manager.getAll_responsableLivraison)
// router.post('/create_responsableLivraison', manager.create_responsableLivraison)

router.post('/login', responsableLivraison.login)

module.exports = router;