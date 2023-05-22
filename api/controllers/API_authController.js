const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const value = require('../config/setup') // process.env.JWT_SECRET || 'key@test'


export async function login(req, res, next) {
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

    const token = jwt.sign({ username }, value.secretKey, { expiresIn: '1h' })
    return res.json({ token, username })
}


export async function userlist(req, res, next) {
    console.log('userlist')
}



