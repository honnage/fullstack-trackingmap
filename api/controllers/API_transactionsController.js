const value = require('../config/setup') // process.env.JWT_SECRET || 'key@test'
const transactionsServices = require('../services/transactions')

export async function transactions(req, res, next) {
    try {
        const transactions = await transactionsServices.transactions(req)
        return res.status(200).json({
            length: transactions.length,
            data: transactions
        })

    } catch (error) {
        return res.status(401).send({
            message: 'Not Query',
        });
    }
}


