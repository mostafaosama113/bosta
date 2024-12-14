require('dotenv').config({path : `${process.cwd()}/.env`})
const express = require('express')
const borrowerRouter = require('./routes/borrowerRoutes')
const bookRouter = require('./routes/bookRouts')
const borrowingRouter = require('./routes/borrowingRouts')
const {authenticator} = require("./middlewares/authenticatorMiddleware");
const {rateLimiter} = require("./middlewares/rateLimiterMiddleware");
const swaggerMiddleware = require("./middlewares/swaggerMiddleware");

const app = express()
const PORT = process.env.APP_PORT || 3000

app.use(express.json())
app.use(rateLimiter);
app.use(authenticator);
app.use('/api/borrower' , borrowerRouter)
app.use('/api/book' , bookRouter)
app.use('/api/borrowing' , borrowingRouter)
swaggerMiddleware(app, PORT);
app.use('*' , (req , res , next) => {
  res.status(404).json({
    'status' : '404 Not Found',
    'message' : 'Route not found!'
  })
})
app.listen(PORT)