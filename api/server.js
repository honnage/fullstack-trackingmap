const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

import morgan  from 'morgan'
import cors  from 'cors'

require('dotenv').config()

const port =  process.env.SERVER_POST || 3066

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))


app.listen(port, () => {
    console.log(`Server runnning on port ${port}`)
})