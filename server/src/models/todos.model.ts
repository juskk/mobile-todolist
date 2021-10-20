const mongoose = require('mongoose')
const Schema = mongoose.Schema

export interface ITodo {
  title: String,
  description: String,
  year: String,
  completed: Boolean,
  public: Boolean,
  createdBy: String,
}

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  year: { type: Number, required: true },
  completed: { type: Boolean, required: true },
  public: { type: Boolean, required: true },
  createdBy: { type: String, required: true }  
}, { timestamps: true })

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo;