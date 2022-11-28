const express = requiere('express')
const router = express.Router()
const currentController = require('../controllers/todoCNTLR')


router.get('/', currentController)

module.exports = router