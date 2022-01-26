const express = require('express');
// const morgan = require('morgan')
const router = express.Router();
const chauffeur = require('../controllers/chauffeur')


router.get('/getAll_chauffeur', chauffeur.getAll_chauffeur)
router.get('/:id', chauffeur.getchauffeur)
router.post('/create_chauffeur', chauffeur.create_chauffeur)
router.post('/acceptCommande', chauffeur.acceptCommande)

router.post('/login', chauffeur.login)

module.exports = router;