const Todo = require('../models/todos.model')

import { ITodo } from '../models/todos.model'

class TodoService {
  async getTodos(createdBy: string, queries: any) {
    let params: any = {};
    const perPage = 6;

    if (queries.completed) params.completed = queries.completed
    if (queries.public) params.public = queries.public
    if (queries.search) params.title = { "$regex": `${queries.search.trim()}`, "$options": "i" };
    const info =  await Todo.find({ createdBy, ...params }).limit(perPage).skip( (queries.page * perPage) - perPage ).sort({createdAt: -1})
    const full = await Todo.find({ createdBy, ...params })
    return [info, full.length, perPage]
  }
  async getTodoById(id: string) {
    return await Todo.findById(id)
  }
  async deleteTodo(id: string) {
    return await Todo.findByIdAndDelete(id, { useFindAndModify: false })
  }
  async updateTodo(id: string, todo: ITodo) {
    return await Todo.findByIdAndUpdate(id, todo, { new: true, useFindAndModify: false })
  }
  async createTodo(todo: ITodo) {
    const newTodo = new Todo(todo)
    return await newTodo.save()
  }
}

module.exports = TodoService