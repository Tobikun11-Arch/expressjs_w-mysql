import express from 'express'
import dotenv from 'dotenv'
import usersRouter from './routes/users.js'

dotenv.config()

//express app
const app = express()
const port = 5000
app.use(express.json())

//local check if port is working - (for production purposes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Users routes
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})