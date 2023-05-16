const devicesServices = require('../services/devices')
const transactionsServices = require('../services/transactions')
const userServices = require('../services/user')

exports.pageTransactions = async (req, res, next) => {
    try {
        const devices = await devicesServices.getAllDevices(req)
        const user = await userServices.getProfile(req)
        const transactions = await transactionsServices.transactions(req)

        const data = {
            devices: devices,
            user: user,
            transactions: transactions
        }
        res.render('transactions', {
            data: data,
            pageTitle: 'Transactions',
            deviceId: '',
            path: '/transactions',
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}