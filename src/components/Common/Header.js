import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import styles from './Header.scss'
class Header extends Component {
  render () {
    return (
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <p className={styles.headerWelcome}>{this.props.text}</p>
          <center>Mint</center>
          <a className={styles.logout} href='/logout'>
            Logout
          </a>
        </div>
      </div>
    )
  }
}

export default Header
