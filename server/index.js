import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todos.js';
const app = express();
dotenv.config();
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/todos', todosRoutes)
const mongodb = "mongodb+srv://ckmobile:ckmobile123@nodetuts.qwlpv.mongodb.net/todos-database?retryWrites=true&w=majority"
app.get('/', (req, res) => {
    res.send('Welcome to server')
})
const PORT = process.env.PORT || 5000;
mongoose.connect(mongodb, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => app.listen(5000, () => console.log(`server is running on port ${PORT}`))).catch(err => console.log(err))

