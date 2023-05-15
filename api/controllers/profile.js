const Users = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')


exports.getProfile = async (req, res, next) => {
  try {
      res.render('profile', {
          // data: data,
          pageTitle: 'Profile',
          deviceId: '',
          path: '/profile'
      })
  } catch (error) {
      console.log(error);
      next(error);
  }
}
