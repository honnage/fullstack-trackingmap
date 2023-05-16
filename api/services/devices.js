const Devices = require('../models/devices')

exports.getAllDevices = async (req) => {
    const devices = await Devices.findAll(
        { raw: true }
    )
    return devices
}

exports.findDevices = async (req) => {
    const devices = await Devices.findOne({
        where: { deviceNumber: req.body.Device_Number },
        raw: true
    })
    return devices
}

exports.insertDevices = async (req) => {
    const insertDevices = await Devices.create({
        deviceNumber: req.body.Device_Number,
    }, { raw: true })
    return insertDevices
}
