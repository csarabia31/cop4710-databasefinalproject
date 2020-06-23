import { userConstants } from '../constants/user'
import auth from 'basic-auth'

const login = (username, password) => {
  const loginRequest = user => {
    return { type: userConstants.LOGIN_REQUEST, user }
  }
  const loginSuccess = user => {
    return { type: userConstants.LOGIN_SUCCESS, user }
  }
  const loginFailure = error => {
    return { type: userConstants.LOGIN_FAILURE, error }
  }

  return dispatch => {
    dispatch(loginRequest({ username }))

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }

    fetch('http://localhost:3007/login', requestOptions)
      .then(res => res.json())
      .then(authObject => {
        if (authObject.err) {
          throw new Error(authObject.err.loginMessage)
        } else {
          dispatch(loginSuccess(authObject.authUser))
        }
      })
      .catch(err => {
        dispatch(loginFailure(err.message))
      })
  }
}

const logout = () => {
  fetch('https://localhost:3007/logout')
  return { type: userConstants.LOGOUT }
}

export const userActions = {
  login,
  logout
}
