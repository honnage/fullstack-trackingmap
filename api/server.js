const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

import morgan from 'morgan'
import cors from 'cors'

require('dotenv').config()
// import router from './routes/api'


// routes web
const trackerRoutes = require('./routes/web/tracker')

// controllers
const errorController = require('./controllers/error') // controllers error

const port = process.env.SERVER_POST || 3066
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')


app.use(morgan('dev', {
    skip: (req, res) => req.path.startsWith('/assets')
}))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


// app.use('api', router)
app.use(trackerRoutes)
app.use(errorController.get404) // page not found

app.listen(port, () => {
    console.log(`Server runnning on port ${port}`)
})