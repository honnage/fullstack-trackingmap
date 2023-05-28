import tokenService from '../services/token';
const value = require('../config/setup'); // process.env.JWT_SECRET || 'key@test'
import jwt from 'jsonwebtoken';
const moment = require('moment')

export async function checkToken(req, res, next) {
    console.log('checkToken', req.headers.token);
    const token = req.headers.token;
    if (!token) {
        return res.status(404).send({
            message: 'No token',
        });
    }

    try {
        const { username, iat, exp } = await jwt.verify(token, value.JWT_SecretKey);
        const timeNow = moment(moment(new Date()))
        const iatDate = moment(new Date(iat * 1000))
        const expDate = moment(new Date(exp * 1000))
        const timeNow_format = moment(timeNow).format('YYYY-MM-DD HH:mm:ss')
        const iatDate_format = moment(iatDate).format('YYYY-MM-DD HH:mm:ss')
        const expDate_format = moment(expDate).format('YYYY-MM-DD HH:mm:ss')

        // console.log('token ==> ', username, iat, exp);
        console.log(`${timeNow_format} date ===> ${username}  ${iatDate_format}   ${expDate_format}`);
        if (expDate.isAfter(timeNow)) {
            console.log('ยังไม่ถึง');
            next()
        } else {
            console.log('เกินเวลา');
            return res.status(404).send({
                message: 'Token expires',
            });
        }

    } catch (error) {
        console.error('Error:', error.message);
        return res.status(404).send({
            message: error,
        });
    }
}
