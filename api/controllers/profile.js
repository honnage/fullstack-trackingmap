const Users = require('../models/user')

const devicesServices = require('../services/devices')
const transactionsServices = require('../services/transactions')
const userServices = require('../services/user')

exports.getProfile = async (req, res, next) => {
    try {
        const devices = await devicesServices.getAllDevices(req)
        const transactions = await transactionsServices.lastTracing_byDevices(req)
        const user = await userServices.getProfile(req)

        const data = {
            devices: devices,
            tracing: transactions,
            user: user
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
