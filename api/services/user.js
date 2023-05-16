const moment = require('moment')
const Users = require('../models/user')


exports.getProfile = async (req) => {
    let username = req.session.user.username
    const user = await Users.findOne({ where: { username }, raw: true })
    return user
}


exports.updateProfile = async (req) => {
    const { firstname, lastname, userId } = req.body
    const user = await Users.update({
        firstname: firstname,
        lastname: lastname
    }, {
        where: { id: userId },
        raw: true
    })
    return user
}