const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Users = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'id'
      },
    userId: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'userId'
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        field: 'username'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'password'
    },
    projectname: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'projectname'
    },
    appId: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'appId'
    },
    projectId: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'projectId'
    },
    accessToken: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'accessToken'
    },
    refreshToken: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'refreshToken'
    },
    tokenType: {
        type: Sequelize.STRING,
        allowNull: true,
        field: 'tokenType'
    },
    expiresIn: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: 'expiresIn'
    }
},
    {
        freezeTableName: true
    }
)

module.exports = Users