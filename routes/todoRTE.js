const express = require('express')
const router = express.Router()
const currentController = require('../controllers/todoCNTLR')


router.get('/', currentController.index)
router.get('/getAdditional', currentController.getOtherTodo)

router.post('/addTodo', currentController.addTodo)
router.delete('/deleteTodo', currentController.deleteTodo)
router.put('/changePriority', currentController.changeTodoPriority)
router.put('/markCompleted', currentController.markTodoCompleted)

// router.put('/editTodo', currentController.editTodo)

module.exports = router