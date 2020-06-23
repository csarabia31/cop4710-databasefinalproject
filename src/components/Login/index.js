import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userActions } from '../../actions/user'
import styles from './Login.scss'
import background from '../../resources/background.jpg'
import Cookies from 'js-cookie'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()

    const { username, password } = this.state
    const { dispatch } = this.props
    if (username && password) {
      dispatch(userActions.login(username, password))
    }
  }

  render () {
    const { loggedIn, user, errors } = this.props
    const { username, password } = this.state

    const loggedin =
      loggedIn &&
      user &&
      user.role &&
      (user.role === 4 ? (
        <Redirect to='/admin' />
      ) : (
        <Redirect to='/profile' push />
      ))

    return (
      <div className={styles.container}>
        <div className={styles.splashScreen}>
          <div className={styles.titleText}>
            <h1>Welcome to Mint</h1>
            <p className={styles.subtitle}>Management made easy.</p>
            <p className={styles.authors}>
              Created by William Walsh, Erick Orozco, Camilo Sarabia
            </p>
          </div>
          <img
            className={styles.splashImage}
            src={background}
            alt='Background'
          />
        </div>
        <div className={styles.formWrapper}>
          <h2 className={styles.loginText}>Login</h2>
          <p className={styles.loginSubText}>Welcome! Please Login below.</p>
          <form onSubmit={this.handleSubmit}>
            <p className={styles.username}>Username</p>
            <input
              className={styles.loginInput}
              id='username'
              type='text'
              value={username}
              placeholder='Enter your username...'
              onChange={this.handleChange}
            />
            <p className={styles.username}>Password</p>
            <input
              className={styles.loginInput}
              id='password'
              type='password'
              value={password}
              placeholder='Enter your password...'
              onChange={this.handleChange}
            />
            <button className={styles.submitLogin} type='submit'>
              Login
            </button>
          </form>
          {loggedin}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { loggedIn, user, error } = state.authentication
  return {
    loggedIn,
    user,
    error
  }
}

const connectedLoginForm = withRouter(connect(mapStateToProps)(Login))
export { connectedLoginForm as Login }
