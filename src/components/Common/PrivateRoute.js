import React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      loggedIn === true ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
)

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
    const { loggedIn, user} = state.authentication
    return {
      loggedIn,
      user
    }
  }
  
  const connectedLoginForm = withRouter(connect(mapStateToProps)(PrivateRoute))
  export { connectedLoginForm as PrivateRoute }
  
