const value = require('../config/setup') // process.env.JWT_SECRET || 'key@test'

const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenServices = require('../services/token')

export async function login(req, res, next) {
    console.log('login', req.body)

    const { username, password } = req.body

    // ตรวจสอบว่าชื่อผู้ใช้และรหัสผ่านไม่ว่างเปล่า
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' })
    }

    // ค้นหาผู้ใช้จากชื่อผู้ใช้ในฐานข้อมูล
    const user = await Users.findOne({
        where: { username },
        raw: true
    })

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password', redirect: '/' });
    }

    // เปรียบเทียบรหัสผ่านที่ป้อนเข้ามากับรหัสผ่านที่เข้ารหัสในฐานข้อมูล
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(402).json({ message: 'Invalid username or password', redirect: '/' });
    }

    console.log('>> username', username)
    // const token = jwt.sign({ username }, value.secretKey, { expiresIn: '1h' })

    let token = await tokenServices.encode(username)
    let token_decode = await tokenServices.decode(token)

    console.log('token', token)

    return res.status(200).json({ token, username })
}


export async function userlist(req, res, next) {
    console.log('userlist')
}



