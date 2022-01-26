const express = require('express');
// const morgan = require('morgan')
const router = express.Router();
const chauffeur = require('../controllers/chauffeur')


router.get('/getAll_chauffeur', chauffeur.getAll_chauffeur)
router.get('/:id', chauffeur.getchauffeur)
router.post('/create_chauffeur', chauffeur.create_chauffeur)
router.post('/acceptCommande', chauffeur.acceptCommande)
// routes admin_genirale
// router.get('/:id', manager.getmanager)
// router.post('/', manager.getAdmin)
// router.get('/getAll_responsableLivraison/:id', manager.getAll_responsableLivraison)
// router.post('/create_responsableLivraison', manager.create_responsableLivraison)

router.post('/login', chauffeur.login)

module.exports = router;