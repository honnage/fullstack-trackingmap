const Users = require('../models/user')

const devicesServices = require('../services/devices')
const transactionsServices = require('../services/transactions')
const userServices = require('../services/user')

exports.getProfile = async (req, res, next) => {
    try {
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

        res.render('profile', {
            data: data,
            pageTitle: 'Profile',
            deviceNumber: '',
            path: '/profile'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        // console.log('req body', req.body)
        const user = await userServices.updateProfile(req)
        // console.log('return data user', user)
        return res.redirect('/')

    }catch (error) {
        console.log(error);
        next(error);
    }
}

