const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Test = sequelize.define('test', {
    data: {
        type: Sequelize.STRING,
        field: 'data'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'createdAt'
    },
},
    {
        freezeTableName: true
    }
)

module.exports = Test