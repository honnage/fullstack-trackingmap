const authCheck = (req, res, next) => {

    // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบแล้วหรือไม่
    // if (req.session.user == undefined || !req.session.user) {

    if (!req.session.user) {
        return res.status(401).redirect('/login')
        // return res.status(401).json({ redirect: '/login', message: 'Unauthorized' })
    }

    // ผู้ใช้เข้าสู่ระบบแล้ว ดำเนินการต่อไป
    next()
}

module.exports = authCheck
