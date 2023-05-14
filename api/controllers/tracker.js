const Devices = require('../models/devices')
const DevicesWialon = require('../models/devicesWialon')
const Transactions = require('../models/transactions')
const TransactionsWialon = require('../models/transactionsWialon')

exports.getIndex = (req, res, next) => {
    res.render('tracker', {
        data: '',
        pageTitle: 'Dashboard',
        path: '/'
    })
}

exports.getDashboardTest = (req, res, next) => {
    res.render('dashboard-test', {
        data: '',
        pageTitle: 'Dashboard test',
        path: '/dashboard-test'
    })
}


exports.sendData = (req, res, next) => {
    console.log('sendData')
    console.log('req body', req.body)

}
