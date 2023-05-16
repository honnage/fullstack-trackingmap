const devicesServices = require('../services/devices')
const transactionsServices = require('../services/transactions')
const userServices = require('../services/user')

exports.getDevice = async (req, res, next) => {
    const deviceId = req.params.deviceId
    try {
        const devices = await devicesServices.getAllDevices(req)
        const transactions = await transactionsServices.lastTracing_byDevices(req)
        const user = await userServices.getProfile(req)

        const data = {
            devices: devices,
            tracing: transactions,
            user: user
        }
        res.render('tracker', {
            data: data,
            pageTitle: 'Device Tracking',
            path: '/device',
            deviceId: deviceId
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.lastTracing_byDevices = async (req, res, next) => {
    try {
        const transactions = await transactionsServices.lastTracing_byDevices(req)
        await res.json({
            data: transactions,
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getIndex = async (req, res, next) => {
    console.log('getIndex')
    try {
        const devices = await devicesServices.getAllDevices(req)
        const transactions = await transactionsServices.lastTracing_byDevices(req)
        const user = await userServices.getProfile(req)

        console.log('transactions', transactions)
        const data = {
            devices: devices,
            tracing: transactions,
            user: user
        }
        res.render('tracker', {
            data: data,
            pageTitle: 'Dashboard',
            deviceId: '',
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
            deviceId: '',
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
