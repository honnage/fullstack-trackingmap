const Devices = require('../models/devices')

exports.getAllDevices = async (deviceId) => {
    const devices = await Devices.findAll(
        { raw: true }
    )
    return devices
}
