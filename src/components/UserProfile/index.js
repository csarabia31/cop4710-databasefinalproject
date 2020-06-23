import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Axios from 'axios'
import Header from '../Common/Header'
import styles from './UserProfile.scss'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import FormHelperText from '@material-ui/core/FormHelperText'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fname: '',
      lname: '',
      username: '',
      password: '',
      department: '',
      project: '',
      salary: '',
      query: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this)
    this.handleProjectChange = this.handleProjectChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    //get sql query for mysql database
    Axios.get('http://localhost:3007/api/queries')
      .then(res => {
        this.setState({ query: res.data })
      })
      .catch(err => console.log(err))

    const { user } = this.props
    this.setState({
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      password: user.password,
      salary: user.salary
    })
  }

  handleChange (e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleDepartmentChange (e) {
    this.setState({ department: e.target.value })
  }

  handleProjectChange (e) {
    this.setState({ project: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    var c = this
    const {
      fname,
      lname,
      username,
      password,
      department,
      project,
      salary
    } = this.state
    Axios.post('http://localhost:3007/api/editProfile', {
      id: this.props.user.id,
      fname: fname,
      lname: lname,
      username: username,
      password: password,
      department: department ? project : this.props.user.department,
      project: project ? project : this.props.user.current_project,
      salary: salary
    })
      .then(function (response) {
        c.setState({ msg: 'Account info has been updated' })
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const { loggedIn, user } = this.props
    return (
      <React.Fragment>
        <Header text={`Welcome ${user.username}`} />
        <div className={styles.profileContainer}>
          <h1 className={styles.profile}>{`Hello ${user.fname}!`}</h1>
          <h3 className={styles.subtitle}>Here is your profile information:</h3>
          <div className={styles.profileInfoContainer}>
            <form
              className={styles.editUser}
              onSubmit={this.handleSubmit}
              autoComplete='off'
            >
              <FormControl fullWidth>
                <TextField
                  margin='normal'
                  label='First Name'
                  id='fname'
                  value={this.state.fname || undefined}
                  onChange={this.handleChange}
                  variant='outlined'
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  margin='normal'
                  label='Last Name'
                  id='lname'
                  value={this.state.lname || undefined}
                  onChange={this.handleChange}
                  variant='outlined'
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  margin='normal'
                  label='Username'
                  id='username'
                  fullWidth
                  value={this.state.username || undefined}
                  onChange={this.handleChange}
                  variant='outlined'
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  margin='normal'
                  label='Password'
                  id='password'
                  fullWidth
                  value={this.state.password || undefined}
                  onChange={this.handleChange}
                  variant='outlined'
                />
              </FormControl>
              <FormControl margin='normal' fullWidth>
                <InputLabel>
                  {this.state.query.departments &&
                    Object.values(this.state.query.departments).find(
                      x => x.dept_id === user.department
                    ).dept_name}
                </InputLabel>
                <Select
                  id='department'
                  value={this.state.department}
                  onChange={this.handleDepartmentChange}
                  label='Department'
                  variant='outlined'
                  fullWidth
                >
                  <MenuItem value='' disabled>
                    {this.state.query.departments &&
                      Object.values(this.state.query.departments).find(
                        x => x.dept_id === user.department
                      ).dept_name}
                  </MenuItem>
                  {this.state.query.departments
                    ? Object.values(this.state.query.departments).map(dept => (
                        <MenuItem
                          margin='normal'
                          key={dept.dept_id}
                          value={dept.dept_id}
                        >
                          {dept.dept_name}
                        </MenuItem>
                      ))
                    : ''}
                </Select>
                <FormHelperText>Department</FormHelperText>
              </FormControl>
              <FormControl margin='normal' fullWidth>
                <InputLabel>
                  {this.state.query.projects &&
                    this.state.query.projects.find(
                      y => y.project_id === user.current_project
                    ).project_name}
                </InputLabel>
                <Select
                  id='project'
                  value={this.state.project}
                  onChange={this.handleProjectChange}
                  label='Project'
                  variant='outlined'
                  fullWidth
                >
                  <MenuItem value='' disabled>
                    {this.state.query.projects &&
                      Object.values(this.state.query.projects).find(
                        x => x.project_id === user.current_project
                      ).project_name}
                  </MenuItem>
                  {this.state.query.projects
                    ? Object.values(this.state.query.projects).map(project => (
                        <MenuItem
                          margin='normal'
                          key={project.project_id}
                          value={project.project_id}
                        >
                          {project.project_name}
                        </MenuItem>
                      ))
                    : ''}
                </Select>
                <FormHelperText>Current Project</FormHelperText>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  margin='normal'
                  label='Salary'
                  id='salary'
                  type='number'
                  value={user.salary || undefined}
                  onChange={this.handleChange}
                  variant='outlined'
                  fullWidth
                />
              </FormControl>
              <FormControl>
                <Button
                  type='submit'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  onClick={this.handleSubmit}
                >
                  Update Info
                </Button>
              </FormControl>
            </form>
          </div>
          <div className={styles.updateContainer}></div>
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

const connectedProfileForm = withRouter(connect(mapStateToProps)(Profile))
export { connectedProfileForm as Profile }
