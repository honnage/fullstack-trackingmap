const Transactions = require('../models/transactions')

exports.lastTracing_byDevices = async (deviceId) => {
    const devices = await Transactions.findAll(
        { raw: true }
    )

    return devices
}
