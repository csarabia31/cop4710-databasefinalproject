const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const dbconfig = require('./db_config.js')

const con = mysql.createPool({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  database: dbconfig.database,
  multipleStatements: true
})

const app = express()
app.use(cors())
require('./config/express').configExpress(app)
require('./config/passport').configPassport(app)
require('./routes/user')(app)

//enable cors on application
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

//queries used on the admin dashboard page
app.get('/api/queries', function (req, res) {
  //set query statement for admin dashboard
  var sql =
    'SELECT * FROM employees;SELECT * FROM department;SELECT * FROM roles;SELECT * FROM project;'
  //connect to database
  con.getConnection(function (err, connection) {
    //perform query
    connection.query(sql, function (err, results, fields) {
      //release query for refreshing
      connection.release()
      if (err) throw err

      const tableData = {
        employees: results[0],
        departments: results[1],
        roles: results[2],
        projects: results[3]
      }
      //send results to frontend
      res.send(tableData)
    })

    if (err) {
      console.error('error connecting: ' + err.stack)
      return
    }
    console.log('Connected to database.')
  })
})

app.post('/api/newEmployee', (req, res, next) => {
  var sql =
    `INSERT INTO employees (fname, lname, username, password) VALUES ('` +
    req.body.fname +
    `', '` +
    req.body.lname +
    `', '` +
    req.body.username +
    `', '` +
    req.body.password +
    `');`
  console.log(sql)

  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, results, fields) {
      connection.release()
      if (err) {
        if (err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {
          console.log('Cannot insert a duplicate entry to the database')
        } else {
          console.log('error connecting.')
          return
        }
      } else {
        console.log('Connected to database & performed insertion.')
        res.send(JSON.stringify(results))
      }
    })
  })
})

app.post('/api/newProject', (req, res, next) => {
  var sql =
    `INSERT INTO project (project_name) VALUES ('` +
    req.body.project_name +
    `');`
  console.log(sql)

  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, results, fields) {
      connection.release()
      if (err) {
        if (err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {
          console.log('Cannot insert a duplicate entry to the database')
        } else {
          console.log('error connecting.')
          return
        }
      } else {
        console.log('Connected to database & performed insertion.')
        res.send(JSON.stringify(results))
      }
    })
  })
})

app.post('/api/newDepartment', (req, res, next) => {
  var sql =
    `INSERT INTO department (dept_name) VALUES ('` + req.body.dept_name + `');`
  console.log(sql)

  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, results, fields) {
      connection.release()
      if (err) {
        if (err.code == 'ER_DUP_ENTRY' || err.errno == 1062) {
          console.log('Cannot insert a duplicate entry to the database')
        } else {
          console.log('error connecting.')
          return
        }
      } else {
        console.log('Connected to database & performed insertion.')
        res.send(JSON.stringify(results))
      }
    })
  })
})

app.post('/api/deleteEmployee', (req, res, next) => {
  var sql = `DELETE FROM employees WHERE username = '` + req.body.username + `'`

  console.log(sql)

  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, results, fields) {
      connection.release()
      if (err) throw err

      res.send(JSON.stringify(results))
    })
    if (err) {
      console.log('error connecting.')
      return
    }
    console.log('Connected to database & performed deletion.')
  })
})

app.post('/api/deleteProject', (req, res, next) => {
  var sql = `DELETE FROM project WHERE project_id = '` + req.body.id + `'`

  console.log(sql)

  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, results, fields) {
      connection.release()
      if (err) throw err

      res.send(JSON.stringify(results))
    })
    if (err) {
      console.log('error connecting.')
      return
    }
    console.log('Connected to database & performed deletion.')
  })
})

app.post('/api/deleteDepartment', (req, res, next) => {
  var sql = `DELETE FROM department WHERE dept_id = '` + req.body.id + `'`

  console.log(sql)

  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, results, fields) {
      connection.release()
      if (err) throw err

      res.send(JSON.stringify(results))
    })
    if (err) {
      console.log('error connecting.')
      return
    }
    console.log('Connected to database & performed deletion.')
  })
})

app.post('/api/editProfile', (req, res, next) => {
  var sql =
    `UPDATE employees SET fname = '` +
    req.body.fname +
    `' ,lname = '` +
    req.body.lname +
    `' ,username = '` +
    req.body.username +
    `' ,password = '` +
    req.body.password +
    `' ,department = ` +
    req.body.department +
    ` ,current_project = ` +
    req.body.project +
    ` ,salary = ` +
    req.body.salary +
    ` WHERE id = ` +
    req.body.id +
    `;`

  console.log(sql)

  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, results, fields) {
      connection.release()
      if (err) throw err

      res.send(JSON.stringify(results))
    })
    if (err) {
      console.log('error connecting.')
      return
    }
    console.log('Connected to database & performed edit.')
  })
})

const PORT = process.env.PORT || 3007
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
