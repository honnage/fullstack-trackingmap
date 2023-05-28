const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const cookieSession = require('cookie-session')

require('dotenv').config()

const timeZone = 'Asia/Bangkok'
const moment = require('moment')
const momenttz = require('moment-timezone')
const sequelize = require('./util/database')
const value = require('./config/setup')


// models
const Log = require('./models/log')


// routes web
const transactionsRoutes = require('./routes/web/transactions')
const trackerRoutes = require('./routes/web/tracker')
const devicesRoutes = require('./routes/web/devices')
const profileRoutes = require('./routes/web/profile')
const authenticationRoutes = require('./routes/web/authentication')

// routes api
const authRoutesAPI = require('./routes/api/auth')



// controllers
const errorController = require('./controllers/error') // controllers error


const port = value.port
const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.text())
app.use(bodyParser.json())

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 60 * 60 * 1000 // 1 hr
}))


morgan.token('time', (req, res, tz) => {
    const formattedTime = momenttz().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
    return `\x1b[32m${formattedTime}\x1b[0m`; // สีเขียว
})

morgan.token('method', (req, res) => {
    const coloredMethod = `\x1b[33m${req.method}\x1b[0m`; // สีเหลือง
    return coloredMethod;
});

morgan.token('sessionUser', (req, res, tz) => {
    let sessionUser = 'SERVER'
    if (req.session.user) [
        sessionUser =  req.session.user.username
    ]
    return sessionUser
})

const customFormat = ':time :method :url :status :response-time ms - :res[content-length] :sessionUser ';
app.use(morgan(customFormat, {
    stream: {
        write: function (message) {
            console.log(message)
            console.log('')

            const logData = message.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, '').split(' ');
            let data = {
                method: logData[2],
                path: logData[3],
                status: logData[4],
                timeProcess: logData[5] + ' ' + logData[6] + ' ' + logData[7] + ' ' + logData[8],
                callApiBy: logData[9],
                timestamp: momenttz().tz(timeZone).format('YYYY-MM-DD HH:mm:ss')
            }
            // console.log('data', data)

            // Log.create({
            //     method: data.method,
            //     path: data.path,
            //     status: data.status,
            //     timeProcess: data.timeProcess,
            //     level: 'info',
            //     callApiBy: data.callApiBy, // Assuming session.user contains the caller information
            //     timestamp: data.timestamp
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
app.use('/api/v2', authRoutesAPI)

app.use(authenticationRoutes)
app.use(transactionsRoutes)
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