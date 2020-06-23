'use strict'

const mysql = require('mysql')
const config = require('../db_config')

const con = mysql.createConnection(config)

const _login = (username, password, done) => {
  con.query(
    "SELECT * FROM `employees` WHERE `username` = '" + username + "'",
    (err, rows) => {
      if (err) return done(err)
      if (!rows.length)
        return done({ loginMessage: 'Invalid username or password.' })
      if (!(rows[0].password == password))
        return done({ loginMessage: 'Invalid username or password' })

      return done(null, rows[0])
    }
  )
}

const _getUserById = (id, done) => {
  con.query('SELECT * FROM employees WHERE id = ' + id, (err, rows) => {
    if (err) return done(err)
    if (!rows.length) return done({ loginMessage: 'User not found.' })

    return done(null, rows[0])
  })
}

module.exports.login = _login
module.exports.getUserById = _getUserById
