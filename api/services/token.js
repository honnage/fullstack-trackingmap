import jwt from 'jsonwebtoken'
const value = require('../config/setup') // process.env.JWT_SECRET || 'key@test'

const moment = require('moment')
const Users = require('../models/user')


async function checkToken(token) {
    let fiterUser= null
    try {
        const {username} = await jwt.decode(token)
        fiterUser = username
        console.log('checkToken fiterUser', fiterUser)
    } catch(err) {
        console.log('checkToken error', err)
        return false
    }

    const user = await Users.findOne({
        where: { username },
        raw: true
    })
    if (user) {
        const token = jwt.sign({_id: fiterId}, value.secretKey, {expiresIn: '1h'})
        return { token }
    } else {
        return false
    }
}


export default {

    // เข้ารหัส token
    encode: async (username) => {
        const token = jwt.sign({username}, value.secretKey, {expiresIn: '1h'})
        return token;
    },

     // ภอดรหัส token
    decode: async (token) => {
        try {
            const {username, iat, exp} = await jwt.verify(token, value.secretKey)

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
}
