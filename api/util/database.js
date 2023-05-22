const Sequelize = require('sequelize')
const value = require('../config/setup')

const DB_NAME = value.DB_NAME
const DB_USER = value.DB_USER
const DB_PASSWORD = value.DB_PASSWORD
const DB_HOST = value.DB_HOST
const DB_PORT = value.DB_PORT


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    timezone: "+07:00",
    logging: false, // log query
    operatorsAliases: false,
    define: {
        // timestamps: false, //disable timestamps 'createdAt' and 'updatedAt'
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_unicode_ci'
        }
    }
})

module.exports = sequelize