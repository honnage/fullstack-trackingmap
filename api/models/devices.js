const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Devices = sequelize.define('devices',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        deviceNumber: {
            type: Sequelize.STRING,
        },
        deviceName: {
            type: Sequelize.STRING,
        },
        model: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
    },
    {
        freezeTableName: true
    }
)


module.exports = Devices