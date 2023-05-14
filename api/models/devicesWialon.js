const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const DevicesWialon = sequelize.define('devicesWialon', {
    deviceId: {
        type: Sequelize.STRING,
        field: 'deviceId'
    },
    devicePassword: {
        type: Sequelize.STRING,
        field: 'devicePassword'
    },
    CRC16: {
        type: Sequelize.STRING,
        field: 'CRC16'
    },
    version: {
        type: Sequelize.STRING,
        field: 'version'
    },
    status: {
        type: Sequelize.INTEGER,
        field: 'status'
    }
},
    {
        freezeTableName: true
    }
)

module.exports = DevicesWialon