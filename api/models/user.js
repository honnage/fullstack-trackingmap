const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Users = sequelize.define('users', {
    userId: {
        type: Sequelize.STRING,
        unique: true,
        field: 'userId'
    },
    username: {
        type: Sequelize.STRING,
        field: 'username'
    },
    password: {
        type: Sequelize.STRING,
        field: 'password'
    },
    projectname: {
        type: Sequelize.STRING,
        field: 'projectname'
    },
    appId: {
        type: Sequelize.STRING,
        field: 'appId'
    },
    projectId: {
        type: Sequelize.STRING,
        field: 'projectId'
    },
    accessToken: {
        type: Sequelize.TEXT,
        field: 'accessToken'
    },
    refreshToken: {
        type: Sequelize.STRING,
        field: 'refreshToken'
    },
    tokenType: {
        type: Sequelize.STRING,
        field: 'tokenType'
    },
    expiresIn: {
        type: Sequelize.INTEGER,
        field: 'expiresIn'
    }
},
    {
        freezeTableName: true
    }
)

module.exports = Users