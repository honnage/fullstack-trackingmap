const Users = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 12
const jwt = require('jsonwebtoken')
const JWT_SecretKey = 'login-test'

exports.getPageLogin = async (req, res, next) => {
  try {
    res.render('login', {
      // data: data,
      pageTitle: 'Login',
      deviceNumber: '',
      path: '/login'
    })
  } catch (error) {
    console.log(error);
    next(error);
  }
}


exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.query
    // console.log('username, password', username, password)

    // ตรวจสอบว่าชื่อผู้ใช้งานมีค่าและไม่ว่างเปล่า
    if (!username || username.trim() === '') {
      return res.status(400).json({ message: 'Username is required' });
    }

    // ตรวจสอบว่ารหัสผ่านมีค่าและมีจำนวนตัวอักษรมากกว่า 6
    if (!password || password.trim().length < 6) {
      return res.status(400).json({ message: 'Password should have at least 6 characters' });
    }

    // ตรวจสอบว่ามีชื่อผู้ใช้งานนี้ซ้ำหรือไม่
    const existingUser = await Users.findOne({ where: { username } })
    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use' })
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // สร้างผู้ใช้งานใหม่ในฐานข้อมูล
    const newUser = await Users.create({ username, password: hashedPassword })
      .then(result => {
        res.status(201).json({ message: 'Registered successfully' })
      })
      .catch(err => {
        console.log(err)
      })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' })
  }
}


exports.login = async (req, res, next) => {
  try {
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
      return res.redirect('/')
      // return res.status(401).json({ message: 'Invalid username or password', redirect: '/' });
    }

    // เปรียบเทียบรหัสผ่านที่ป้อนเข้ามากับรหัสผ่านที่เข้ารหัสในฐานข้อมูล
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.redirect('/')
      // return res.status(401).json({ message: 'Invalid username or password', redirect: '/' });
    }

    const token = jwt.sign({ username }, JWT_SecretKey, { expiresIn: '1h' });
    // console.log('token', token)
    // console.log('token', token)

    // // เก็บ Token ในเซสชัน (หรือในตำแหน่งที่คุณต้องการ)
    // req.session.token = token;

    // สร้างเซสชัน
    req.session.user = { username }

    if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }


    // res.status(200).json({ message: 'Login successful', token })
    res.redirect('/')
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

exports.logout = async (req, res, next) => {
  req.session = null
  res.redirect('/login')
}


exports.resetPassword = async (req, res, next) => {
  console.log('=== resetPassword')
  // console.log('req.params', req.params)
  // console.log('req.query', req.query)
  // console.log('req.body', req.body)
  try {
    const { newPassword, renewPassword, userId } = req.body
    console.log('userId', userId)
    console.log('newPassword', newPassword)
    console.log('renewPassword', renewPassword)


    // ตรวจสอบว่ารหัสผ่านใหม่และการยืนยันรหัสผ่านใหม่ตรงกัน
    if (newPassword !== renewPassword) {
        console.log('รหัสผ่านใหม่และการยืนยันรหัสผ่านใหม่ไม่ตรงกัน')
        return res.status(400).json({ error: 'รหัสผ่านใหม่และการยืนยันรหัสผ่านใหม่ไม่ตรงกัน' });
    }

    // ตรวจสอบความยาวของรหัสผ่านใหม่
    if (newPassword.length < 6) {
      console.log('รรหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร')
      return res.status(400).json({ error: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร' });
    }

    // เข้ารหัสรหัสผ่านใหม่
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds)

    // อัปเดตรหัสผ่านใหม่ในฐานข้อมูล
    await Users.update({ password: hashedPassword }, { where: { id: userId } })
      .then(result => {
        res.status(200).json({ message: 'เปลี่ยนรหัสผ่านเรียบร้อยแล้ว' }) // ส่งการตอบกลับ
      })
      .catch(err => {
        console.log(err)
      })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน' });
  }
}
