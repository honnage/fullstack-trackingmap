const Devices = require('../models/devices')

exports.insertDevice = (req, res, next) => {
    console.log('insertDevice')

    console.log('insertDevice', req.body)
    const deviceId = req.body.deviceId
    const hereName = req.body.hereName
    const acc = req.body.acc
    const uploadTrigger = req.body.uploadTrigger
    const dateTime = req.body.dateTime
    const latitude = req.body.latitude
    const longitude = req.body.longitude
    const attitude = req.body.attitude
    const gpsmode = req.body.gpsmode
    const gpsfix = req.body.gpsfix
    const crc = req.body.crc
    const status = req.body.status
    const trackingId = req.body.trackingId
    const hereDeviceId = req.body.hereDeviceId
    const hereDeviceSecret = req.body.hereDeviceSecret
    Devices.create({
        deviceId: deviceId,
        hereName: hereName,
        acc: acc,
        uploadTrigger: uploadTrigger,
        dateTime: dateTime,
        latitude: latitude,
        longitude: longitude,
        attitude: attitude,
        gpsmode: gpsmode,
        gpsfix: gpsfix,
        crc: crc,
        status: status,
        trackingId: trackingId,
        hereDeviceId: hereDeviceId,
        hereDeviceSecret: hereDeviceSecret,
    })
        .then(result => {
            // console.log(result)
            console.log('Created Devices')
            res.status(200).send('OK')
        })
        .catch(err => {
            res.status(503).send('error')
            console.log(err)
        })
}