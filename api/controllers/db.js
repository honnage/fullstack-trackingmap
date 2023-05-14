const Devices = require('../models/devices')
const DevicesWialon = require('../models/devicesWialon')
const Transactions = require('../models/transactions')
const TransactionsWialon = require('../models/transactionsWialon')
const Test = require('../models/test')
const Testnew = require('../models/testnew')
const User = require('../models/user')

exports.checkdevice = async (deviceId) => {
    console.log('checkdevice')
    let result = await Devices.findOne({
        where: {
            deviceId: deviceId
        }
    })
    return result
}


exports.insertTest = async (data) => {
    await Test.create({
        data: data
    })
    return 1
}


exports.insertConn = async (data) => {
    let result = await Transactions.create({
        type: data.type,
        deviceId: data.DEVICE_ID,
        crc: data.CRC,
        type: data.type
    })
    return result
}


exports.updateConn = async (data) => {
    let result = await Devices.update({
        status: 1,
        crc: data.CRC,
        type: data.type
    }, {
        where: { deviceId: data.DEVICE_ID }
    })
    return result
}


exports.insertData = async (data) => {
    let devarr = await Devices.findAll({})
    for (let i in devarr) {
        if (devarr[i].deviceId == data.DEVICE_ID) {
            let result = await Transactions.create({
                type: data.type,
                deviceId: data.DEVICE_ID,
                hereName: devarr[i].hereName,
                acc: data.ACC,
                uploadTrigger: data.UPLOAD_TRIGGER,
                dateTime: data.DATE_TIME,
                latitude: data.LATITUDE,
                longitude: data.LONGITUDE,
                speed: data.SPEED,
                attitude: data.ALTITUDE,
                gpsmode: data.GPS_MODE,
                gpsfix: data.GPS_FIX,
                crc: data.CRC
            })

            let result1 = await Devices.update({
                type: data.type,
                acc: data.ACC,
                uploadTrigger: data.UPLOAD_TRIGGER,
                dateTime: data.DATE_TIME,
                latitude: data.LATITUDE,
                longitude: data.LONGITUDE,
                speed: data.SPEED,
                attitude: data.ALTITUDE,
                gpsmode: data.GPS_MODE,
                gpsfix: data.GPS_FIX,
                crc: data.CRC
            }, {
                where: { deviceId: data.DEVICE_ID }
            })
            return result
        }
    }
}


exports.sendDataHere = async (data, uploadtrigger, someDate) => {
    let resultuser = await User.findOne({
        where: {
            id: 1
        },
    })
    let accessToken = resultuser.accessToken

    let trackId = await Devices.findOne({
        where: {
            deviceId: data.DEVICE_ID
        },
    })

    let trackingId = trackId.trackingId
    let a = await sendHere(trackingId, data.LATITUDE, data.LONGITUDE, parseInt(data.SPEED), parseFloat(data.ALTITUDE), someDate, parseInt(data.ACC), uploadtrigger, accessToken)
    if (a.status == 200) { return 200 }
    else if (a.status == 90) { return 90 }
}


function sendHere(trackingId, LATITUDE, LONGITUDE, SPEED, ALTITUDE, DATE_TIME, ACC, uploadtrigger, accessToken) {
    return new Promise(function (resolve, reject) {
        // console.log(trackingId, LATITUDE, LONGITUDE, SPEED, ALTITUDE, DATE_TIME, ACC, uploadtrigger, accessToken)
        var data = JSON.stringify({
            "id": trackingId,
            "data": [
                {
                    "position": {
                        "accuracy": 20,
                        "lat": LATITUDE,
                        "lng": LONGITUDE,
                        "speed": SPEED,
                        "alt": ALTITUDE
                    },
                    "timestamp": DATE_TIME,
                    "payload": {
                        "ACCStatus": ACC,
                        "Upload_Tricker": uploadtrigger
                    }
                }
            ]
        })

        var config = {
            method: 'post',
            url: 'https://tracking.api.here.com/v3/',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            data: data
        }
        console.log(config)
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                resolve({ status: 200 })
            })
            .catch(function (error) {
                console.log(error);
                resolve({ status: 90 })
            })
    })
}



exports.insertTestnew = async (data) => {
    await Testnew.create({
        data: data
    })
    return 1
}


exports.insertTransactionsWialon = async (data) => {
    await TransactionsWialon.create({
        type: data.type,
        deviceDate: data.deviceDate,
        deviceTime: data.deviceTime,
        Lat1: data.Lat1,
        Lat2: data.Lat2,
        Lon1: data.Lon1,
        Lon2: data.Lon2,
        Speed: data.Speed,
        Course: data.Course,
        Alt: data.Alt,
        Sats: data.Sats,
        CRC16: data.CRC16
    })
    return 200
}


exports.insertDevice = async (data) => {
    let result = await DevicesWialon.findOne({
        where: {
            deviceId: data.deviceId
        }
    });
    if (result == null) {
        let result1 = await DevicesWialon.create({
            deviceId: data.deviceId,
            version: data.version,
            devicePassword: data.devicePassword,
            CRC16: data.CRC16,
            status: 1
        });
        return 200
    } else {
        let result = await DevicesWialon.update({
            version: data.version,
            devicePassword: data.devicePassword,
            CRC16: data.CRC16,
            status: 1
        }, {
            where: { deviceId: data.deviceId }
        });
        return 200
    }
}