const Devices = require('../models/devices')
const devicesServices = require('../services/devices')
const transactionsServices = require('../services/transactions')

const momenttz = require('moment-timezone')
const db = require('./db')

exports.lastTracing_byDevices = async (req, res, next) => {
    try {
        const transactions =  await transactionsServices.lastTracing_byDevices(req)
        await res.json({
            data: transactions,
          })

    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getIndex = async (req, res, next) => {
    try {
        const devices = await devicesServices.getAllDevices(req)
        const transactions =  await transactionsServices.lastTracing_byDevices(req)

        const data = {
            devices: devices,
            tracing: transactions
        }
        res.render('tracker', {
            data: data,
            pageTitle: 'Dashboard',
            path: '/'
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getDashboardTest = async (req, res, next) => {
    try {
        const devices = await devicesServices.getAllDevices(req)
        const data = {
            devices: devices
        }
        res.render('dashboard-test', {
            data: data,
            pageTitle: 'xx Dashboard',
            path: '/dashboard-test'
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}


exports.sendData = (req, res, next) => {
    console.log('sendData')
    console.log('req body', req.body)

    let readReq = JSON.stringify(req.body);
    let dd = JSON.parse(readReq)
    let d = dd.st
    let dataraw = d
    console.log(d)

    let dataArr = d.split(';') // #SD#030322;140418;1354.5476;N;10035.4198;E;1.631;NA;0.0;NA;0XF66A
    // console.log('dataArr', dataArr)
    if (dataArr[0] == "$A") {
        // $A;867553057977902;0X0B7C
        let dataA = {
            type: dataArr[0],
            DEVICE_ID: dataArr[1],
            CRC: dataArr[2]
        }
        db.checkdevice(dataArr[1]).then((result) => {
            if (result != null) {
                db.insertTest(dataraw).then(() => {
                    trackercon(dataA, dd.st, res)
                })
            } else {
                res.jsonp({ status: 99, msg: "device was not found" })
            }
        })

    } else if (dataArr[0] == "$M") {
        //$M;867553057977902,1,7,051121092739,1387.67561,10058.43378,1.900,-14.2,,;0X6765
        let darr = dataArr[1].split(',')
        let lat = parseFloat(darr[4]) / 100
        let lng = parseFloat(darr[5]) / 100
        let dataM = {
            type: dataArr[0],
            DEVICE_ID: darr[0],
            ACC: darr[1],
            UPLOAD_TRIGGER: darr[2],
            DATE_TIME: darr[3],
            LATITUDE: lat,
            LONGITUDE: lng,
            SPEED: darr[6],
            ALTITUDE: darr[7],
            GPS_MODE: darr[8],
            GPS_FIX: darr[9],
            CRC: dataArr[2]
        }
        // console.log(dataM)
        db.checkdevice(darr[0]).then((result) => {
            if (result != null) {
                db.insertTest(dataraw).then(() => {
                    trackerData(dataM, dd.st, res)
                    res.jsonp("OK")
                })
            } else { res.jsonp({ status: 99, msg: "device was not found" }) }
        })
    } else {
        db.insertTestnew(dataraw).then(() => { console.log(dataraw) })
        let wialon = dataArr[0].slice(0, 4)
        let deviceDate = dataArr[0].slice(4)
        let wialonLogin = dataArr[0].slice(0, 3)
        let wialonV = dataArr[0].slice(3)
        if (wialon == "#SD#") {
            // #SD#030322;140418;1354.5476;N;10035.4198;E;1.631;NA;0.0;NA;0XF66A
            // #SD#Date;Time;Lat1;Lat2;Lon1;Lon2;Speed;Course;Alt;Sats;CRC16\r\n
            console.log("wialon " + deviceDate + ", " + dataArr[2] + ", " + dataArr[4])
            let lat0 = parseFloat(dataArr[2]) / 100
            let lng0 = parseFloat(dataArr[4]) / 100

            let lat1 = lat0.toString().split('.')
            let prelat = lat1[0]
            let suplat = parseInt(parseFloat(lat1[1]) / 60)
            let lat = parseFloat(prelat + "." + suplat)

            let lon1 = lng0.toString().split('.')
            let prelon = lon1[0]
            let suplon = parseInt(parseFloat(lon1[1]) / 60)
            let lng = parseFloat(prelon + "." + suplon)

            let dataSD = {
                type: wialon,
                deviceDate: deviceDate,
                deviceTime: dataArr[1],
                Lat1: lat,
                Lat2: dataArr[3],
                Lon1: lng,
                Lon2: dataArr[5],
                Speed: dataArr[6],
                Course: dataArr[7],
                Alt: dataArr[8],
                Sats: dataArr[9],
                CRC16: dataArr[10]
            }
            console.log(dataSD)
            db.insertTransactionsWialon(dataSD).then((data) => {
                if (data == 200) {
                    res.jsonp({ status: 200, msg: "success" })
                } else { res.jsonp({ status: 99, msg: "error" }) }
            });
        } else if (wialonLogin == "#L#") {
            // #L#2.0;867730051235566;NA;0XD7C7
            // #L#Protocol_version;IMEI;Password;CRC16\r\n
            let dataL = {
                version: wialonV,
                deviceId: dataArr[1],
                devicePassword: dataArr[2],
                CRC16: dataArr[3]
            }
            console.log(dataL)
            db.insertDevice(dataL).then((data) => {
                if (data == 200) {
                    res.jsonp({ status: 200, msg: "success" })
                } else { res.jsonp({ status: 99, msg: "error" }) }
            });
        } else {
            res.json("failed.")
        }
    }
}


function trackercon(data, datareceived, res) {
    console.log('trackercon')
    db.insertConn(data).then((data1) => {
        db.updateConn(data).then((data2) => {
            console.log('updateConn data2',)
            res.jsonp(datareceived)
        })
    })
}


function trackerData(data, datareceived, res) {
    db.insertData(data).then((data1) => {
        if (data1 == undefined) {
            res.jsonp("id not found")
        }
        else {
            sendToHere(data, datareceived, res)
        }
    })
}


function sendToHere(data, datareceived, res) {
    let uploadtrigger = ""
    let status = parseInt(data.UPLOAD_TRIGGER)
    switch (status) {
        case 1:
            uploadtrigger = "Device startup"
            break;
        case 2: case 3: case 4: case 5:
            uploadtrigger = " Driving speed change "
            break;
        case 6:
            uploadtrigger = "Sudden accelerate or decelerate"
            break;
        case 7:
            uploadtrigger = "Low constant"
            break;
        case 8:
            uploadtrigger = "Stop"
            break;
        case 9:
            uploadtrigger = "Cannot receive GNSS"
            break;
        case 10:
            uploadtrigger = "Can receive GNSS"
            break;
        case 11:
            uploadtrigger = "Removal detection"
            break;
        case 12:
            uploadtrigger = "Departure"
            break;
        case 13:
            uploadtrigger = "ACC-OFF"
            break;
        case 12:
            uploadtrigger = "GNSS Malfunction"
            break;
        default:
            console.log("Unknown value");
            break;
    }

    var preY = momenttz(new Date());
    preY = preY.tz('Asia/Bangkok').format("YYYY");
    let y = preY.substring(0, 2)
    let a = data.DATE_TIME
    let DD = a.substring(0, 2)
    let MM = a.substring(2, 4)
    let YY = a.substring(4, 6)
    let HH = a.substring(6, 8)
    let mm = a.substring(8, 10)
    let ss = a.substring(10, 12)
    let str = y + YY + '-' + MM + '-' + DD + 'T' + HH + ':' + mm + ':' + ss + 'Z' //2014-12-01T12:00:00Z
    var daterequest = momenttz(new Date(str));
    daterequest = daterequest.tz('Asia/Bangkok').format();
    console.log(daterequest)
    var someDate = new Date(daterequest)
    someDate = someDate.getTime();

    db.sendDataHere(data, uploadtrigger, someDate).then((data1) => {
        console.log(data1)
        if (data1 == 200) { res.jsonp(datareceived) }
        else if (data1 == 90) { res.json("Error") }
    });
}
