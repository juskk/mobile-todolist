const TodoService = require('../services/todo.service')
import { StatusHandler } from '../factories/validators.factory'

import { Response, Request } from 'express'
import { ITodo } from '../models/todos.model'
const Todo = require('../models/todos.model')

const todoService = new TodoService()
const status = new StatusHandler()

class TodoController {
  async getTodos(req: Request, res: Response) {
    try {
      const queries = {...req.query}
      const info: ITodo[] = await todoService.getTodos(req.params.createdBy, queries)
      status.Success(res, {todos: info[0], length: info[1], perPage: info[2]})
    } catch (e) {
      status.NotFound(res, e)
    }
  }

  async getTodo(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const todo: ITodo = await todoService.getTodoById(id)
      if (!todo) status.NotFound(res)
      status.Success(res, todo)
    } catch (e) {
      status.BadRequest(res, e)
    }
  }

  async createTodo(req: Request, res: Response) {
    try {
      const todo: ITodo = await todoService.createTodo({ ...req.body })
      status.Created(res, todo)
    } catch (e) {
      status.BadRequest(res, e)
    }
  }

  async updateTodo(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const todo: ITodo = await todoService.updateTodo(id, req.body)
      status.Success(res, todo)
    } catch (e) {
      status.BadRequest(res, e)
    }
  }

  async deleteTodo(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const todo: ITodo = await todoService.deleteTodo(id)
      status.Success(res, todo)
    } catch (e) {
        status.BadRequest(res, e)
    }
  }
}

module.exports = TodoController