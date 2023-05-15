const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Log = sequelize.define('Log', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    method: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    path: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    timeProcess: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    level: {
        type: Sequelize.STRING,
        allowNull: false
    },
    callApiBy: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    timestamp: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    tableName: 'logs',
    timestamps: false
})

module.exports = Log;
