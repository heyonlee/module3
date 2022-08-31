import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: String,
    priority: Number
}, { timestamps: true });
const Todo = mongoose.model('Todo', todoSchema)
export default Todo;