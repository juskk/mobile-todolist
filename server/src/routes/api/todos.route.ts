const router = require('express').Router();
const TodoController = require('../../controllers/todo.controller')
import { ValidationFactory } from '../../factories/validators.factory'

const todoController = new TodoController()
const validation = new ValidationFactory()

router.route('/all/:createdBy').get(todoController.getTodos)
router.route('/:id').get(todoController.getTodo)
router.route('/add').post(validation.todoValidationParams, validation.checkValidity, todoController.createTodo)
router.route('/update/:id').post(todoController.updateTodo)
router.route('/delete/:id').delete(todoController.deleteTodo)




export default router