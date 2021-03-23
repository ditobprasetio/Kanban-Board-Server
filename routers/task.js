const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/taskController')
const authorization = require('../middlewares/authorization')

router.post('/', TaskController.create)
router.get('/', TaskController.display)
router.get('/:id', TaskController.displayOne)
router.patch('/title/:id', authorization, TaskController.editTask)
router.patch('/:id', authorization, TaskController.editCategory)
router.delete('/:id', authorization, TaskController.delete)

module.exports = router