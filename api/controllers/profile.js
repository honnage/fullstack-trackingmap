const Users = require('../models/user')

const devicesServices = require('../services/devices')
const transactionsServices = require('../services/transactions')

exports.getProfile = async (req, res, next) => {
    try {
        const devices = await devicesServices.getAllDevices(req)
        const transactions = await transactionsServices.lastTracing_byDevices(req)

        const data = {
            devices: devices,
            tracing: transactions
        }

        res.render('profile', {
            data: data,
            pageTitle: 'Profile',
            deviceId: '',
            path: '/profile'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}
