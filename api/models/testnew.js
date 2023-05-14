const Sequelize = require('sequelize')

const sequelize = require('../util/database')


const Testnew = sequelize.define('testnew', {
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

module.exports = Testnew