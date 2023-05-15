const moment = require('moment')
const Users = require('../models/user')


exports.getProfile = async (req) => {
    let username = req.session.user.username
    const user = await Users.findOne({ where: { username }, raw: true })
    return user
}
