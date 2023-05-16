const express = require('express')
const { body, validationResult } = require('express-validator')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const cookieSession = require('cookie-session')
const momenttz = require('moment-timezone')

require('dotenv').config()

// models
const Log = require('./models/log')

// routes web
const trackerRoutes = require('./routes/web/tracker')
const devicesRoutes = require('./routes/web/devices')
const profileRoutes = require('./routes/web/profile')
const authenticationRoutes = require('./routes/web/authentication')

// controllers
const errorController = require('./controllers/error') // controllers error
const sequelize = require('./util/database')

const port = process.env.SERVER_POST || 3066
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.text());

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 60 * 60 * 1000 // 1 hr
}))


morgan.token('time', (req, res, tz) => {
    return momenttz(new Date()).format('YYYY-MM-DD HH:mm:ss')
})

morgan.token('sessionUser', (req, res, tz) => {
    let sessionUser = ' SERVER '
    if (req.session.user) [
        sessionUser =  req.session.user.username
    ]
    return sessionUser
})

const customFormat = ':time => :method :url :status :response-time ms - :res[content-length] | CALL API BY => :sessionUser ';

// show log and save log to database
app.use(morgan(customFormat, {
    stream: {
        write: function (message) {

            console.log(message);
            // const logData = message.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '').split(' ');
            // console.log('logData', logData)

            // Log.create({
            //     method: logData[0],
            //     path: logData[1],
            //     status: logData[2],
            //     timeProcess: logData[3] + ' ' + logData[4] + ' ' + logData[5] + ' ' + logData[6],
            //     level: 'info',
            //     callApiBy: '', // Assuming session.user contains the caller information
            //     timestamp: new Date()
            // });
        }
    },
    skip: (req, res) => {
        return (
            req.path.startsWith('/assets') ||
            req.path.startsWith('/device/assets') ||
            req.path.startsWith('/api/assets')
        );
    }
}));


// app.use('api', router)
app.use(authenticationRoutes)
app.use(profileRoutes)
app.use(trackerRoutes)
app.use(devicesRoutes)

app.use(errorController.get404) // page not found

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

sequelize
    .sync()
    .then(result => {
        console.log('Connect database success !!')
    })
    .catch(err => {
        console.log('Connect database fail !', err)
    })