// Import/require libraries
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const cors = require('cors')

const app = express()

// Use Express Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cors())

// Set up server
app.listen(3000, function () {
    console.log("Server is listening at port 3000.")
})

// Connect to Mongodb
const url = //add your own url
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })



// Set up MODEL - Mongoose
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {
        type: String,
    },
    done: {
        type: Boolean,
    }
})

const Todo = mongoose.model('Todo', todoSchema)

// Set up CONTROLLER (CRUD)
// https://mongoosejs.com/docs/models.html
const create = function (title) {
    const newTodo = { title, done: false }

    const todo = new Todo(newTodo)

    // Additional Logic

    return todo.save()
}

const findAll = function () {
    return Todo.find()
}

const updateById = function (id, todo) {
    return Todo.findOneAndUpdate({ _id: id }, { $set: { title: todo.title, done: todo.done } })
}

// Set up our ROUTES (GET,POST,PUT,DELETE) - Express
app.post('/', async function (req, res) {

    try {
        const title = req.body.title
        // console.log("Request body", req.body)
        console.log("Todo Title:", title)

        const result = await create(title) // result successful or result null/error
        console.log("result", result)

        // check result is valid
        if (result) {
            res.status(200).send(result)

        } else {
            res.status(500).send("Database error")
        }


    } catch (error) {
        console.log(error)
        res.status(500).send("Server internal error")
    }

})

app.get('/', async function (req, res) {

    try {

        const result = await findAll()

        console.log("Result", result)

        if (result) {
            res.status(200).send(result)

        } else {
            res.status(500).send("Database error")
        }

    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Error")
    }
})


app.put('/:id', async function (req, res) {
    try {
        const id = req.params.id
        const todo = req.body

        const result = await updateById(id, todo)

        console.log("Id", id)
        console.log("todo", todo)

        res.send(result)

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal error")
    }

})

app.delete('/:id', function (req, res) {
    res.send("Hello")
})