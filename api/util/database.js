const Sequelize = require('sequelize')

const DB_NAME = process.env.DB_NAME || 'trackers'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 3306

// const DB_NAME =  'trackers'
// const DB_USER = 'root'
// const DB_PASSWORD =  ''
// const DB_HOST = 'localhost'
// const DB_PORT = 3306

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