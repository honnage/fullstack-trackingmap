const moment = require('moment')
const Transactions = require('../models/transactions')

const sequelize = require('../util/database')

exports.lastTracing_byDevices = async (data) => {
    // console.log('lastTracing_byDevices deviceId', data.query.deviceId)
    const deviceId = parseInt(data.query.deviceId)
    // console.log('deviceId', deviceId)

    let whereQuery = ''
    if (data.query.deviceId !== undefined ) { // select by deviceId
        whereQuery = `WHERE transactions.deviceId = '${parseInt(deviceId)}'`
    }

    const subQuery = `(SELECT transactions.deviceId, MAX(transactions.createdAt) AS lastDate FROM transactions  ${whereQuery} GROUP BY transactions.deviceId) max_date`
    const where = `WHERE trans.deviceId = max_date.deviceId AND trans.createdAt = max_date.lastDate`
    const order = `ORDER BY trans.createdAt DESC`

    const { QueryTypes } = require('sequelize')
    const devices = sequelize.query(
        `SELECT trans.*, DATE_FORMAT(trans.createdAt, '%Y-%m-%d %H:%i:%s') AS formattedCreatedAt FROM transactions trans, ${subQuery} ${where} ${order} `,
        {
          type: QueryTypes.SELECT,
          raw: true
        }
      )
    //   console.log( JSON.stringify(devices)) // Promise { <pending> }

    for (let i = 0; i < devices.length; i++) {
        console.log(devices[i])
        if (devices[i].createdAt == 'Invalid Date') {
            devices[i].createdAt = '-'
        } else {
            devices[i].createdAt = moment(devices[i].createdAt).format('YYYY-MM-DD HH:mm:ss')
        }
        // console.log('createdAt', devices[i].createdAt)
    }

    return devices
}
