import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import MaterialTable from 'material-table'

class Employees extends Component {
  constructor (props) {
    super(props)

    this.state = {
      employee: [],
      handleEdit: false,
      id: '',
      columns: [],
      data: []
    }

    this.getColumnNames = this.getColumnNames.bind(this)
  }

  componentDidMount () {
    this.getColumnNames()
  }

  getColumnNames () {
    this.setState({
      columns: [
        { title: 'ID', field: 'id'},
        { title: 'First Name', field: 'fname' },
        { title: 'Last Name', field: 'lname' },
        { title: 'Username', field: 'username' },
        { title: 'Password', field: 'password' },
        {
          title: 'Role',
          field: 'role',
          lookup: { 1: 'user', 4: 'admin' },
          editable: 'never'
        },
        {
          title: 'Department',
          field: 'department',
          lookup: { 1: 'SD', 5: 'Sales' }
        },
        {
          title: 'Current Project',
          field: 'current_project',
          lookup: { 100: 'Credit Card Processing' }
        },
        {
          title: 'Salary',
          field: 'salary',
          type: 'currency',
          editable: 'always'
        }
      ]
    })
  }

  render () {
    return (
      <React.Fragment>
        <MaterialTable
          title='Employees'
          columns={this.state.columns}
          data={this.props.employees ? Object.values(this.props.employees) : []}
          options={{ pageSize: 12, pageSizeOptions: [] }}
          editable={{
            isEditable: rowData => rowData.role !== 4,
            isDeletable: rowData => rowData.role !== 4,
            onRowAdd: e =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve()
                  this.setState(prev => {
                    this.props.handleSubmit(e)
                    const data = [...prev.data]
                    data.push(e)
                    return { ...prev, data }
                  })
                })
              }),
            onRowUpdate: (ne, e) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve()
                  if (e) {
                    this.setState(prev => {
                      this.props.handleChange(ne)
                      const data = [...prev.data]
                      data[data.indexOf(e)] = ne
                      return { ...prev, data }
                    })
                  }
                })
              }),
            onRowDelete: e =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve()
                  this.setState(prev => {
                    this.props.deleteUser(e)
                    const data = [...prev.data]
                    data.splice(data.indexOf(e), 1)
                    return { ...prev, data }
                  })
                })
              })
          }}
        />
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

const connectedEmployees = withRouter(connect(mapStateToProps)(Employees))
export { connectedEmployees as Employees }
