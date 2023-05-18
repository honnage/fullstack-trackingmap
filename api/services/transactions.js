const moment = require('moment')
const momenttz = require('moment-timezone')
const timeZone = 'Asia/Bangkok'

const sequelize = require('../util/database')
const Transactions = require('../models/transactions')

const devicesServices = require('../services/devices')

const Sequelize = require('sequelize')
const { QueryTypes } = require('sequelize')

exports.transactions = async (req) => {
    // const today = new Date();
    // const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    // const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

    const transactions = await Transactions.findAll({
        attributes: [
          '*',
          [Sequelize.literal("DATE_FORMAT(time, '%Y-%m-%d %H:%i:%s')"), 'formatTime'],
          [Sequelize.literal("DATE_FORMAT(createdAt, '%Y-%m-%d %H:%i:%s')"), 'formatCreatedAt']
        ],
        // where: {
        // createdAt: {
        //         [Sequelize.Op.between]: [startOfDay, endOfDay]
        //     }
        // },
        order: [['createdAt', 'DESC']],
        raw: true
      });
    return transactions
}

exports.lastTracing_byDevices = async (req) => {
    const deviceNumber = parseInt(req.query.deviceNumber)
    // console.log('lastTracing_byDevices deviceNumber', deviceNumber)
    let whereQuery = ''
    if (req.query.deviceNumber !== undefined ) { // select by deviceNumber
        whereQuery = `WHERE transactions.deviceNumber = ${parseInt(deviceNumber)}`
    }
    // console.log('whereQuery', whereQuery)

    const subQuery = `(SELECT transactions.deviceNumber, MAX(transactions.createdAt) AS lastDate FROM transactions  ${whereQuery} GROUP BY transactions.deviceNumber) max_date`
    const where = `WHERE trans.deviceNumber = max_date.deviceNumber AND trans.createdAt = max_date.lastDate`
    const order = `ORDER BY trans.createdAt DESC`


    const devices = await sequelize.query(
        `SELECT trans.*, DATE_FORMAT(trans.createdAt, '%Y-%m-%d %H:%i:%s') AS formattedCreatedAt FROM transactions trans, ${subQuery} ${where} ${order} `,
        {
          type: QueryTypes.SELECT,
          raw: true
        }
      )
    //   console.log('devices', devices)

    for (let i = 0; i < devices.length; i++) {
        let checkLatitude = false
        let checkLongitude = false
        let checkTemperature = false
        let posmap = false
        let checkData = '-'

        if (devices[i].temperature >= -300 && devices[i].temperature <= 300) {
            checkTemperature = true
        }

        if (devices[i].latitude >= -90 && devices[i].latitude <= 90) {
            checkLatitude = true
        }

        if (devices[i].longitude >= -180 && devices[i].longitude <= 180) {
            checkLongitude = true
        }

        if(checkLatitude != true || checkLongitude != true) {
            // console.log(i)
            // console.log('checkLatitude', checkLatitude)
            // console.log('checkLongitude', checkLongitude)
            // console.log(devices[i])
            posmap = false
            checkData = 'GPS data is problem'
        } else {
            posmap = true
        }

        if(checkLongitude == false || checkLongitude == false) {
            checkData = 'Location data is problem'
        }

        if(checkTemperature == false ) {
            checkData = 'Temperature data is problem'
        }

        devices[i]['posmap'] = posmap
        devices[i]['checkData'] = checkData
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
    // const formattedTime = moment(req.body.Time, 'YYMMDD,HHmmss').format('YYYY-MM-DD HH:mm:ss')
    // const formattedTime = moment.tz(req.body.Time, 'YYMMDD,HHmmss', 'Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
    const originalTime = moment.tz(req.body.Time, 'YYMMDD,HHmmss', 'Asia/Bangkok');
    const modifiedTime = originalTime.subtract(7, 'hours');
    const formattedTime = modifiedTime.format('YYYY-MM-DD HH:mm:ss');

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