const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const morgan = require('morgan')
const cors = require('cors')

require('dotenv').config()
// import router from './routes/api'


// routes web
const trackerRoutes = require('./routes/web/tracker')
const devicesRoutes = require('./routes/web/devices')


// controllers
const errorController = require('./controllers/error') // controllers error
const sequelize = require('./util/database')

const port = process.env.SERVER_POST || 3066
// const db = require('./util/database')
// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result)
// })
// .catch(err => {
//     console.log(err)
// })

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')


app.use(morgan('dev', {
    skip: (req, res) => req.path.startsWith('/assets')
}))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.text())


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