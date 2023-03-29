const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

require('dotenv').config()


app.use(cors())
app.use(express.json())

app.post('/app/user', async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query("INSERT INTO calculator (description) VALUES($1) RETURNING *", [description])
        console.log(newTodo.rows[0])
        res.json(newTodo)
    } catch (err) {
        console.error(err.message)
    }
})


app.get('/app/user/:id/transaction', async (req, res) => {
    try {
        console.log(req.params)
    } catch (error) {
        console.error(error.message)
    }
})


app.listen(5000, () => {
    console.log("server has started")
})