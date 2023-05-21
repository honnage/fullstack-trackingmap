const devicesServices = require('../services/devices')
const transactionsServices = require('../services/transactions')
const userServices = require('../services/user')

exports.getDevice = async (req, res, next) => {
    try {
        const deviceNumber = req.params.deviceNumber
        const devices = await devicesServices.getAllDevices(req)
        const transactions = await transactionsServices.lastTracing_byDevices(req)
        const user = await userServices.getProfile(req)
        const notification = transactions.filter(row => row.temperature >= 40 || row.humidity >= 40);

        const data = {
            devices: devices,
            tracing: transactions,
            user: user,
            notification: notification
        }
        res.render('tracker', {
            data: data,
            pageTitle: 'Device Tracking',
            path: '/device',
            deviceNumber: deviceNumber
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.lastTracing_byDevices = async (req, res, next) => {
    try {
        const transactions = await transactionsServices.lastTracing_byDevices(req)

        // console.log(notification);
        // console.log('notification', notification.length)

        // console.log('transactions', transactions)
        await res.json({
            data: transactions,
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getIndex = async (req, res, next) => {
    try {
        const devices = await devicesServices.getAllDevices(req)
        const transactions = await transactionsServices.lastTracing_byDevices(req)
        const user = await userServices.getProfile(req)
        const notification = transactions.filter(row => row.temperature >= 40 || row.humidity >= 40);

        // console.log('transactions', transactions)
        const data = {
            devices: devices,
            tracing: transactions,
            user: user,
            notification: notification
        }
        res.render('tracker', {
            data: data,
            pageTitle: 'Dashboard',
            deviceNumber: '',
            path: '/'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getDashboardTest = async (req, res, next) => {
    try {
        const devices = await devicesServices.getAllDevices(req)
        const data = {
            devices: devices
        }
        res.render('dashboard-test', {
            data: data,
            pageTitle: 'Dashboard Test',
            deviceNumber: '',
            path: '/dashboard-test',
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.sendData = async (req, res, next) => {
    console.log('sendData', req.body)
    try {
        const transactions = await transactionsServices.insertTransactions(req)
        .then(result => {
            res.status(200).send('OK')
        })
        .catch(err => {
            console.log('error', err)
            res.status(503).send('')
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}
