const express = require('express')
const chars = require('./controllers/characters.js')

const router = express.Router()

router.get('/persons/:id', chars.getPerson)
router.get('/persons', chars.getPersons)
router.post('/persons', chars.createPerson)
router.patch('/persons/:id', chars.deletePerson)

module.exports = router