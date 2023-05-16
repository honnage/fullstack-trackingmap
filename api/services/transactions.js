const moment = require('moment')
const sequelize = require('../util/database')
const Transactions = require('../models/transactions')

const devicesServices = require('../services/devices')

exports.transactions = async (req) => {
    const transactions = await Transactions.findAll(
        { raw: true }
    )
    return transactions
}

exports.lastTracing_byDevices = async (req) => {
    const deviceId = parseInt(req.query.deviceId)

    let whereQuery = ''
    if (req.query.deviceId !== undefined ) { // select by deviceId
        whereQuery = `WHERE transactions.deviceId = '${parseInt(deviceId)}'`
    }

    const subQuery = `(SELECT transactions.deviceNumber, MAX(transactions.createdAt) AS lastDate FROM transactions  ${whereQuery} GROUP BY transactions.deviceNumber) max_date`
    const where = `WHERE trans.deviceNumber = max_date.deviceNumber AND trans.createdAt = max_date.lastDate`
    const order = `ORDER BY trans.createdAt DESC`

    const { QueryTypes } = require('sequelize')
    const devices = sequelize.query(
        `SELECT trans.*, DATE_FORMAT(trans.createdAt, '%Y-%m-%d %H:%i:%s') AS formattedCreatedAt FROM transactions trans, ${subQuery} ${where} ${order} `,
        {
          type: QueryTypes.SELECT,
          raw: true
        }
      )

    for (let i = 0; i < devices.length; i++) {
        console.log(devices[i])
        if (devices[i].createdAt == 'Invalid Date') {
            devices[i].createdAt = '-'
        } else {
            devices[i].createdAt = moment(devices[i].createdAt).format('YYYY-MM-DD HH:mm:ss')
        }
    }

    return devices
}


exports.insertTransactions = async (req) => {
    const findDevices = await devicesServices.findDevices(req)
    if(findDevices == null) {
        const insertDevices = await devicesServices.insertDevices(req)
        .then(result => {
            console.log('insert data devices')
        })
        .catch(err => {
            console.log('error', err)
        })
    }

    const formattedTime = moment(req.body.Time, 'YYMMDD,HHmmss').format('YYYY-MM-DD HH:mm:ss')
    const data = await Transactions.create({
        deviceNumber: req.body.Device_Number,
        GNSSFaultAlarm: req.body.GNSS_Fault_Alarm,
        GNSSPositionFix: req.body.GNSS_Position_Fix,
        realTimeDataBuffer: req.body.RealTime_Data_0_BufferData_1,
        latitude: req.body.Latitude,
        longitude: req.body.Longitude,
        altitude: req.body.Altitude,
        speed: req.body.Speed,
        direction: req.body.Direction,
        time: formattedTime,
        temperature: req.body.Temperature,
        humidity: req.body.Humidity,
        batteryVolt: req.body.Battery_Volt,
        chargeStatus: req.body.Charge_Status,
        batteryPercent: req.body.Battery_Percent,
    }, { raw: true })
    return data
}