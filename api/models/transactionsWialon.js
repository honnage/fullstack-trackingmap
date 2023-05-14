const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const TransactionsWialon = sequelize.define('transactionsWialon', {
    type: {
        type: Sequelize.STRING,
        field: 'type'
    },
    deviceDate: {
        type: Sequelize.STRING,
        field: 'deviceDate'
    },
    deviceTime: {
        type: Sequelize.STRING,
        field: 'deviceTime'
    },
    Lat1: {
        type: Sequelize.INTEGER,
        field: 'Lat1'
    },
    Lat2: {
        type: Sequelize.INTEGER,
        field: 'Lat2'
    },
    Lon1: {
        type: Sequelize.STRING,
        field: 'Lon1'
    },
    Lon2: {
        type: Sequelize.STRING,
        field: 'Lon2'
    },
    Speed: {
        type: Sequelize.STRING,
        field: 'Speed'
    },
    Course: {
        type: Sequelize.STRING,
        field: 'Course'
    },
    Alt: {
        type: Sequelize.STRING,
        field: 'Alt'
    },
    Sats: {
        type: Sequelize.STRING,
        field: 'Sats'
    },
    CRC16: {
        type: Sequelize.STRING,
        field: 'CRC16'
    }
},
    {
        freezeTableName: true
    }
)

module.exports = TransactionsWialon