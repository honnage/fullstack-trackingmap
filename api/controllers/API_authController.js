const value = require('../config/setup') // process.env.JWT_SECRET || 'key@test'

const Users = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenServices = require('../services/token')

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
    // console.log('xxxxx', await bcrypt.compare(password, user.password))

    const isPasswordValid = await bcrypt.compare(password, user.password)
    console.log('isPasswordValid', isPasswordValid)
    if (!isPasswordValid) {
        console.log('402')
        return res.status(402).json({ message: 'Invalid username or password', redirect: '/' });
    }

    console.log('>> username', username)
    // const token = jwt.sign({ username }, value.JWT_SecretKey, { expiresIn: '1h' })

    let token = await tokenServices.encode(username)
    let token_decode = await tokenServices.decode(token)

    console.log('token', token)

    let userInfo = {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
    }

    return res.status(200).json({ token, userInfo })
}

export async function logout(req, res, next) {
    console.log('api logout', req.headers.token)
    const token = req.headers.token

    if (!token) {
        // ถ้าไม่มี Token ส่งกลับข้อความผิดพลาด
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        jwt.verify(token, value.JWT_SecretKey, (err, decoded) => {
            if (err) {
                // ถ้าไม่สามารถยืนยัน Token ได้ส่งกลับข้อความผิดพลาด
                return res.status(401).json({ message: 'Invalid token' });
            }

            // ถ้ายืนยัน Token สำเร็จ สามารถส่งการตอบกลับเพื่อระบุว่า Logout เสร็จสมบูรณ์
            return res.status(200).json({ message: 'Logout successful' });
        });
    } catch (error) {
        // ถ้าเกิดข้อผิดพลาดในการยกเลิก Token ส่งกลับข้อความผิดพลาด
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function userlist(req, res, next) {
    console.log('userlist')
}



