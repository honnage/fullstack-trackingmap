const Devices = require('../models/devices')
const DevicesWialon = require('../models/devicesWialon')
const Transactions = require('../models/transactions')
const TransactionsWialon = require('../models/transactionsWialon')

exports.getIndex = async (req, res, next) => {
    try {
        const devices = await Devices.findAll({ raw: true });
        const data = {
            devices: devices
        }
        res.render('tracker', {
            data: data,
            pageTitle: 'Dashboard',
            path: '/'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getDashboardTest = async (req, res, next) => {
    try {
        const devices = await Devices.findAll({ raw: true });
        const data = {
            devices: devices
        }
        res.render('dashboard-test', {
            data: data,
            pageTitle: 'xx Dashboard',
            path: '/dashboard-test'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}


exports.sendData = (req, res, next) => {
    console.log('sendData')
    console.log('req body', req.body)

}


exports.insertDevice = (req, res, next) => {
    console.log('insertDevice')
    console.log('req body', req.body)
}
