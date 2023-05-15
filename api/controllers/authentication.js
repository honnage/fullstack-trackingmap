const Users = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')


exports.getPageLogin = async (req, res, next) => {
  try {
      // const devices = await devicesServices.getAllDevices(req)
      // const transactions =  await transactionsServices.lastTracing_byDevices(req)

      // const data = {
      //     devices: devices,
      //     tracing: transactions
      // }
      res.render('login', {
          // data: data,
          pageTitle: 'Login',
          deviceId: '',
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
    const hashedPassword = await bcrypt.hash(password, 12)

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
  console.log('login')
  // console.log('req query', req.query)
  // console.log('req params', req.params)
  // console.log('req body', req.body)
  try {
    const { username, password } =  req.body

    // ตรวจสอบว่าชื่อผู้ใช้และรหัสผ่านไม่ว่างเปล่า
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    // ค้นหาผู้ใช้จากชื่อผู้ใช้ในฐานข้อมูล
    const user = await Users.findOne({ where: { username } })
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    // เปรียบเทียบรหัสผ่านที่ป้อนเข้ามากับรหัสผ่านที่เข้ารหัสในฐานข้อมูล
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    // สร้างเซสชัน
    req.session.user = { username }

    if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // ดึงข้อมูลผู้ใช้จาก session.user
    const sessionUser = req.session.user
    console.log('sessionUser', sessionUser)

    // res.status(200).json({ message: 'Login successful' })
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