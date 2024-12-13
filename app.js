require('dotenv').config({path : `${process.cwd()}/.env`})
const express = require('express')
const borrowerRouter = require('./routes/borrowerRoutes')

const app = express()
app.use(express.json())
app.use('/api/borrower' , borrowerRouter)
app.use('*' , (req , res , next) => {
  res.status(404).json({
    'status' : '404 Not Found',
    'message' : 'Route not found!'
  })
})
const PORT = process.env.APP_PORT || 3000

app.listen(PORT)