const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Transactions = sequelize.define('transactions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    deviceNumber: {
        type: Sequelize.INTEGER,
    },
    GNSSFaultAlarm: {
        type: Sequelize.BOOLEAN,
    },
    GNSSPositionFix: {
        type: Sequelize.BOOLEAN,
    },
    realTimeDataBuffer: {
        type: Sequelize.BOOLEAN,
    },
    latitude: {
        type: Sequelize.STRING,
    },
    longitude: {
        type: Sequelize.DOUBLE,
    },
    altitude: {
        type: Sequelize.DOUBLE,
    },
    speed: {
        type: Sequelize.INTEGER,
    },
    direction: {
        type: Sequelize.INTEGER,
    },
    time: {
        type: Sequelize.TIME,
    },
    temperature: {
        type: Sequelize.DOUBLE,
    },
    humidity: {
        type: Sequelize.DOUBLE,
    },
    batteryVolt: {
        type: Sequelize.DOUBLE,
    },
    chargeStatus: {
        type: Sequelize.INTEGER,
    },
    batteryPercent: {
        type: Sequelize.INTEGER,
    }
},
    {
        freezeTableName: true
    }
)


module.exports = Transactions