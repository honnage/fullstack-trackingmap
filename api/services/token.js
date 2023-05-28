import jwt from 'jsonwebtoken'
const value = require('../config/setup') // process.env.JWT_SECRET || 'key@test'

const moment = require('moment')
const Users = require('../models/user')

async function checkToken(token) {
    let fiterUser = null
    try {
        const { username } = await jwt.decode(token)
        fiterUser = username
        console.log('checkToken fiterUser', fiterUser)
    } catch (err) {
        console.log('checkToken error', err)
        return false
    }

    const user = await Users.findOne({
        where: { username },
        raw: true
    })
    if (user) {
        const token = jwt.sign({ _id: fiterId }, value.JWT_SecretKey, { expiresIn: '1h' })
        return { token }
    } else {
        return false
    }
}

export async function encode(username) {
    // console.log('encode', username)
    const token = jwt.sign({ username }, value.JWT_SecretKey, { expiresIn: '1h' })
    return token;
}

export async function decode(token) {
    // console.log('decode', token)
    try {
        const { username, iat, exp } = await jwt.verify(token, value.JWT_SecretKey)

        const iatDate = moment(new Date(iat * 1000)).format('YYYY-MM-DD HH:mm:ss')
        const expDate = moment(new Date(exp * 1000)).format('YYYY-MM-DD HH:mm:ss')
        console.log('token ==> ', username, iat, exp)
        console.log(`date ===> ${username}  ${iatDate}   ${expDate}`)

        const user = await Users.findOne({
            where: { username },
            raw: true
        })
        // console.log('user', user)
        if (user) {
            return user
        } else {
            return false
        }

    } catch (e) {
        const newtoken = await checkToken(token)
        return newtoken
    }
}
