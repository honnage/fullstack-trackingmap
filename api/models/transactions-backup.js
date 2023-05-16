const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Transactions = sequelize.define('transactions', {
    type: {
        type: Sequelize.STRING,
        field: 'type'
    },
    deviceId: {
        type: Sequelize.STRING,
        field: 'deviceId'
    },
    hereName: {
        type: Sequelize.STRING,
        field: 'hereName'
    },
    acc: {
        type: Sequelize.INTEGER,
        field: 'acc'
    },
    uploadTrigger: {
        type: Sequelize.INTEGER,
        field: 'uploadTrigger'
    },
    dateTime: {
        type: Sequelize.STRING,
        field: 'dateTime'
    },
    latitude: {
        type: Sequelize.STRING,
        field: 'latitude'
    },
    longitude: {
        type: Sequelize.STRING,
        field: 'longitude'
    },
    speed: {
        type: Sequelize.STRING,
        field: 'speed'
    },
    attitude: {
        type: Sequelize.STRING,
        field: 'attitude'
    },
    gpsmode: {
        type: Sequelize.STRING,
        field: 'gpsmode'
    },
    gpsfix: {
        type: Sequelize.STRING,
        field: 'gpsfix'
    },
    crc: {
        type: Sequelize.STRING,
        field: 'crc'
    }
},
    {
        freezeTableName: true
    }
)


module.exports = Transactions