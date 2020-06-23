const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)

const config = require('../db_config')

const conf = {
  secret: 'tis a secret.',
  key: 'asdfwoefsdfszcvwe21345'
}

exports.configExpress = app => {
  let sessionStore = new MySQLStore(config)
  app.locals.pretty = true

  const logErrors = (err, req, res, enxt) => {
    console.error(err.stack)
    next(err)
  }

  const clientErrorhandler = (err, req, res, next) => {
    if (req.xhr) {
      res.send(500, { error: `Somethin ain't right!` })
    } else {
      next(err)
    }
  }

  const errorHandler = (err, req, res, next) => {
    res.status(500)
    res.render('error', { error: err })
  }

  const _applyBodyParser = fn => {
    return (req, res, next) => {
      fn(req, res, next)
    }
  }

  app.use(_applyBodyParser(bodyParser.json()))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(cookieParser())

  app.use(
    session({
      secret: conf.secret,
      key: conf.key,
      store: sessionStore,
      cookie: { maxAge: 1000 * 60 * 60 * 12 },
      resave: true,
      saveUninitialized: true
    })
  )

  if (app.get('env') == 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.end(err.message)
    })
  }
}
