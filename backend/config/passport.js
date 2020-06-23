global.passport = require('passport')
global.localStrategy = require('passport-local').Strategy
const auth = require('../models/user')

exports.configPassport = app => {
  passport.use(
    new localStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      (username, password, done) => {
        auth.login(username, password, done)
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    auth.getUserById(id, done)
  })

  app.use(passport.initialize())
  app.use(passport.session())
}
