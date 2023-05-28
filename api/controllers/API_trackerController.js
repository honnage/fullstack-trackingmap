const value = require('../config/setup') // process.env.JWT_SECRET || 'key@test'
const transactionsServices = require('../services/transactions')

export async function lastTracing_byDevices(req, res, next) {
    try {
        const transactions = await transactionsServices.lastTracing_byDevices(req)
        await res.json({
            length: transactions.length,
            data: transactions,
        })

    } catch (error) {
        console.log(error);
        next(error);
    }
}


