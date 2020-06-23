import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Axios from 'axios'
import styles from './Admin.scss'
import Header from '../Common/Header'
import './carousel.css'
import { Carousel } from 'react-responsive-carousel'
import { Employees } from './Employees/index'
import { Roles } from './Roles/index'
import { Departments } from './Departments/index'
import { Projects } from './Projects/index'

class Admin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: [],
      msg: '',
      employee: [],
      project: [],
      department: []
    }

    this.deleteUser = this.deleteUser.bind(this)
    this.deleteProject = this.deleteProject.bind(this)
    this.deleteDepartment = this.deleteDepartment.bind(this)
    this.handleEmployeeChange = this.handleEmployeeChange.bind(this)
    this.handleEmployeeSubmit = this.handleEmployeeSubmit.bind(this)
    this.handleProjectChange = this.handleProjectChange.bind(this)
    this.handleProjectSubmit = this.handleProjectSubmit.bind(this)
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handleDepartmentSubmit = this.handleDepartmentSubmit.bind(this)
  }

  componentDidMount () {
    //get sql query for mysql database
    Axios.get('http://localhost:3007/api/queries')
      .then(res => {
        this.setState({ query: res.data })
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate () {
    let c = this
    if (this.state.msg !== '') {
      Axios.get('http://localhost:3007/api/queries')
        .then(res => {
          this.setState({ query: res.data })
        })
        .catch(err => console.log(err))

      c.setState({ msg: '', employee: [], project: [], department: [] })
    }
  }

  handleEmployeeChange (e) {
    var c = this
    Axios.post('http://localhost:3007/api/editProfile', {
      id: e.id,
      fname: e.fname,
      lname: e.lname,
      username: e.username,
      password: e.password,
      department: e.department,
      project: e.current_project,
      salary: e.salary
    })
      .then(function (response) {
        c.setState({ msg: 'Account info has been updated' })
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleProjectChange (e) {
    var index = parseInt(e.target.id)
    const project = this.state.project
    project[index] = e.target.value
    this.setState({ project })
  }

  handleDepartmentChange (e) {
    var index = parseInt(e.target.id)
    const department = this.state.department
    department[index] = e.target.value
    this.setState({ department })
  }

  handleEmployeeSubmit (e) {
    var c = this
    Axios.post('http://localhost:3007/api/newEmployee', {
      fname: e.fname || '',
      lname: e.lname || '',
      username: e.username || '',
      password: e.password || ''
    })
      .then(function (response) {
        c.setState({ msg: 'New account has been created.' })
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  handleProjectSubmit (e) {
    e.preventDefault()
    var c = this
    const { project } = this.state
    if (project[0]) {
      Axios.post('http://localhost:3007/api/newProject', {
        project_name: project[0],
        project_start_date: project[1],
        project_desc: project[2]
      })
        .then(function (response) {
          c.setState({ msg: 'New project has been added.' })
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      alert('Please enter all required crendentials')
    }
  }

  handleDepartmentSubmit (e) {
    e.preventDefault()
    var c = this
    const { department } = this.state
    if (department[0]) {
      Axios.post('http://localhost:3007/api/newDepartment', {
        dept_name: department[0],
        dept_desc: department[1]
      })
        .then(function (response) {
          c.setState({ msg: 'New department has been added.' })
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      alert('Please enter all required crendentials')
    }
  }

  deleteUser (e) {
    var c = this
    Axios.post('http://localhost:3007/api/deleteEmployee', {
      username: e.username || ''
    })
      .then(function (response) {
        c.setState({ msg: 'Employee Deletion was successful.' })
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  deleteProject (id) {
    var c = this
    if (id) {
      Axios.post('http://localhost:3007/api/deleteProject', {
        id: id
      })
        .then(function (response) {
          c.setState({ msg: 'Project Deletion was successful.' })
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      console.log('Not a valid project to delete.')
    }
  }

  deleteDepartment (id) {
    var c = this
    if (id) {
      Axios.post('http://localhost:3007/api/deleteDepartment', {
        id: id
      })
        .then(function (response) {
          c.setState({ msg: 'Department Deletion was successful.' })
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      console.log('Not a valid department to delete.')
    }
  }

  render () {
    const { loggedIn, user } = this.props
    return (
      <React.Fragment>
        <div className={styles.container}>
          <Header text={`Welcome ${user.username}`} />
          <Carousel
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            useKeyboardArrows
            dynamicHeight
            width='100%'
            className={[
              styles.carousel,
              styles['carousel-slider'],
              styles['slide']
            ].join(' ')}
          >
            <div>
              <Employees
                employee={this.state.employee}
                department={this.state.query.departments}
                employees={this.state.query.employees}
                handleChange={this.handleEmployeeChange}
                handleSubmit={this.handleEmployeeSubmit}
                deleteUser={this.deleteUser}
              />
            </div>

            <div>
              <Roles roles={this.state.query.roles} />
              <p className={styles.tableName}>Roles</p>
            </div>

            <div>
              <Projects
                project={this.state.project}
                projects={this.state.query.projects}
                handleChange={this.handleProjectChange}
                handleSubmit={this.handleProjectSubmit}
                deleteProject={this.deleteProject}
              />
              <p className={styles.tableName}>Projects</p>
            </div>

            <div>
              <Departments
                department={this.state.department}
                departments={this.state.query.departments}
                handleChange={this.handleDepartmentChange}
                handleSubmit={this.handleDepartmentSubmit}
                deleteDepartment={this.deleteDepartment}
              />
              <p className={styles.tableName}>Departments</p>
            </div>
          </Carousel>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  const { loggedIn, user } = state.authentication
  return {
    loggedIn,
    user
  }
}

const connectedLoginForm = withRouter(connect(mapStateToProps)(Admin))
export { connectedLoginForm as Admin }
