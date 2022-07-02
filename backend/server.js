const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

//  Connect to database
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

//Serve frontend
if(process.env.NODE_ENV === 'production') {
  //Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

// Bug fix for Heroku servers crashing after time
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})
} else {
  app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the support desk API'})
})
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))