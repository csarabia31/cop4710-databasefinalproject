'use strict'
const passport = require('passport')
const auth = require('../models/user')
const userController = require('../controllers/user')
const cors = require('cors')

const register = router => {
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err != null) console.log(err)
      if (err) {
        return res.status(403).json({ err: err, authUser: user })
      }
      if (!user) {
        return res.status(403).json({ err: err, authUser: user })
      }
      req.logIn(user, err => {
        if (err) {
          return res.status(403).json({ err: err, authUser: user })
        }
        res.status(200).json({
          err: null,
          authUser: {
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            username: user.username,
            password: user.password,
            role: user.role,
            department: user.department,
            current_project: user.current_project,
            salary: user.salary
          }
        })
      })
    })(req, res, next)
  })

  router.get('/logout', (req, res) => {
    req.session.destroy()
    req.logout()
    res.status(200).json({ err: null, authUser: {} })
  })
}

module.exports = register;
