const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()
// import router from './routes/api'

// models
const Log = require('./models/log')

// routes web
const trackerRoutes = require('./routes/web/tracker')
const devicesRoutes = require('./routes/web/devices')


// controllers
const errorController = require('./controllers/error') // controllers error
const sequelize = require('./util/database')

const port = process.env.SERVER_POST || 3066
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')


// show log and save log to database
app.use(morgan('dev', {
    stream: {
        write: function (message) {
            console.log(message)
            const logData =  message.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '').split(' ')
            Log.create({
                method: logData[0],
                path: logData[1],
                status: logData[2],
                timeProcess: logData[3] + ' ' + logData[4] + '' + logData[5] + '' + logData[6],
                level: 'info',
                callApiBy: '',
                timestamp: new Date()
            })
        }
    },
    skip: (req, res) => {
        return (
            req.path.startsWith('/assets') ||
            req.path.startsWith('/device/assets')
        )
    }
}))


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


// app.use('api', router)
app.use(trackerRoutes)
app.use(devicesRoutes)
app.use(errorController.get404) // page not found

app.listen(port, () => {
    console.log(`Server runnning on port ${port}`)
})

sequelize
    .sync()
    .then(result => {
        console.log('Connect database success !!')
    })
    .catch(err => {
        console.log('Connect database fail !', err)
    })