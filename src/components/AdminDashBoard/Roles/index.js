import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styles from './Roles.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'

class Roles extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fname: '',
      lname: '',
      username: '',
      password: '',
      handleEdit: false,
      id: ''
    }

    this.gettableHeader = this.gettableHeader.bind(this)
    this.gettableData = this.gettableData.bind(this)
  }

  gettableHeader () {
    return (
      this.props.roles && (
        <TableRow key='columns'>
          {Object.keys(this.props.roles[0]).map(index => {
            return <TableCell key={index}>{index}</TableCell>
          })}
        </TableRow>
      )
    )
  }

  gettableData () {
    return (
      this.props.roles &&
      Object.values(this.props.roles).map((role, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{role.role_id}</TableCell>
            <TableCell>{role.role_name}</TableCell>
            <TableCell>{role.role_desc}</TableCell>
          </TableRow>
        )
      })
    )
  }

  onClick (e) {
    this.props.handleSubmit(e)
    this.setState({ handleEdit: false })
  }

  render () {
    return (
      <React.Fragment>
        <TableContainer className={styles.tableWrapper}>
          <Table stickyHeader aria-label='Database'>
            <TableHead className={styles.tableHeader}>
              {this.gettableHeader()}
            </TableHead>
            <TableBody>{this.gettableData()}</TableBody>
          </Table>
        </TableContainer>
        {this.state.handleEdit ? this.handleEdit() : null}
        {this.state.id ? this.deleteUser() : null}
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

const connectedLoginForm = withRouter(connect(mapStateToProps)(Roles))
export { connectedLoginForm as Roles }
