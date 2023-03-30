require("dotenv").config()
const express = require("express")
const serverless = require("serverless-http")
const app = express()
const cors = require("cors")
const pool = require("./db")

const router = express.Router()

router.use(cors())
router.use(express.json())

router.post("/app/user", async (req, res) => {
  try {
    const { username } = await req.body
    const newUser = await pool.query(
      "INSERT INTO users (name, os) VALUES ($1, $2) RETURNING *",
      [username, "android"]
    )
    console.log(newUser.rows[0])
    res.json(newUser)
  } catch (err) {
    console.error(err.message)
  }
})

router.get("app/user", async (req, res) => {
  const { username } = req.body
  const user = await pool.query("SELECT * FROM users WHERE name = $1", [
    username,
  ])
})

router.get("/app/user/:uuid/transaction", async (req, res) => {
  const { uuid } = req.params

  try {
    const histories = await pool.query(
      "SELECT * FROM histories WHERE user_id = $1",
      [uuid]
    )
    res.json(todo.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

router.post("/app/histories", async (req, res) => {
  const { calculation, uuid } = req.body
  const timestamp = Date.now()
  const newHistory = await pool.query(
    "INSERT INTO histories (calculation, user_id, created_on) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *",
    [calculation, uuid]
  )
  console.log(newHistory.rows[0])
  res.json(newHistory)
})

router.get("/app/histories", async (req, res) => {
  try {
    const history = await pool.query("SELECT * FROM histories")
    res.json(history.rows)
  } catch (error) {
    console.error(error.message)
  }
})

router.delete("/app/histories", async (req, res) => {
    try {
        const history = await pool.query("DELETE FROM histories")
        res.json(history.rows)
    } catch (error) {
        console.error(error.message)
    }
})

router.get('/', (req, res) => {
  res.json({
    'hi' : 'hello'
  })
})


app.use('/.netlify/functions/api',router)

module.exports.handler = serverless(app)