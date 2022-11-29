const express = require('express')
const router = express.Router()
const currentController = require('../controllers/todoCNTLR')


router.get('/', currentController.index)

router.post('/addTodo', currentController.addTodo)

module.exports = router