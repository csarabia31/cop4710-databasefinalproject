'use strict'
const passport = require('passport')
const auth = require('../models/user')

const userLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    req.logIn(user, err => {
      if (err) {
        return res.status(403).json({ err: err, authuser: user })
      }
      res.json(200, { err: null, authuser: user })
    })
  })(req, res, next)
}

module.exports.userLogin = userLogin
