import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styles from './Projects.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class Projects extends Component {
  constructor (props) {
    super(props)

    this.state = {
      handleEdit: false,
      id: ''
    }

    this.gettableHeader = this.gettableHeader.bind(this)
    this.gettableData = this.gettableData.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  gettableHeader () {
    return (
      this.props.projects && (
        <TableRow key='columns'>
          {Object.keys(this.props.projects[0]).map(index => {
            return <TableCell key={index}>{index}</TableCell>
          })}
          <TableCell key='delete' align='center'>
            Actions
          </TableCell>
        </TableRow>
      )
    )
  }

  gettableData () {
    return (
      this.props.projects &&
      Object.values(this.props.projects).map((project, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{project.project_id}</TableCell>
            <TableCell>{project.project_name}</TableCell>
            <TableCell>{project.project_start_date}</TableCell>
            <TableCell>{project.project_desc}</TableCell>
            <TableCell align='center'>
              <DeleteIcon
                className={styles.delete}
                onClick={() => this.props.deleteProject(project.project_id)}
              />
            </TableCell>
          </TableRow>
        )
      })
    )
  }

  handleEdit () {
    const { project } = this.props
    return (
      <div className={styles.formContainer}>
        <form className={styles.f} onSubmit={e => this.onClick(e)}>
          <label className={styles.lbl}>Project Name</label>
          <input
            className={styles.info}
            id={0}
            type='text'
            value={project[0]}
            onChange={this.props.handleChange}
            placeholder='Enter the Project name...'
          />
          <button type='submit' className={styles.add}>
            Add New Project
          </button>
          <button
            onClick={() => this.setState({ handleEdit: false })}
            className={styles.close}
          >
            X
          </button>
        </form>
      </div>
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
        <div className={styles.newUserButton}>
          <button
            className={styles.newUser}
            onClick={() =>
              !this.state.handleEdit
                ? this.setState({ handleEdit: true })
                : this.setState({ handleEdit: false })
            }
          >
            +
          </button>
        </div>
        {this.state.handleEdit ? this.handleEdit() : null}
        {this.state.id ? this.deleteProject() : null}
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

const connectedLoginForm = withRouter(connect(mapStateToProps)(Projects))
export { connectedLoginForm as Projects }
