import React, { Component } from 'react'
import {
  Switch,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'
import { connect } from 'react-redux'
import mysql from 'mysql'
import Axios from 'axios'
import { Admin } from './components/AdminDashBoard/index'
import { Login } from './components/Login/index'
import { Profile } from './components/UserProfile/index'
import { PrivateRoute } from './components/Common/PrivateRoute'
class App extends Component {
  constructor (props) {
    super(props)

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout () {
    const { dispatch } = this.props
    dispatch(userActions.logout())
  }

  render () {
    const { loggedIn} = this.props;

    let reDirect = !loggedIn ? <Redirect to='/login' push /> : ''

    return (
        <Switch>
          <Route path='/login' exact component={Login} />
          <PrivateRoute path='/admin' exact component={Admin} />
          <PrivateRoute path='/profile' exact component={Profile} />
          <Redirect from='/' to='/login' />
          {reDirect}
        </Switch>
      
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

const connectedApp = withRouter(connect(mapStateToProps)(App))
export { connectedApp as App }