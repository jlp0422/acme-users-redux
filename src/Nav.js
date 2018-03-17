/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div style={{ marginBottom: 20 }}>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to='/users'>Users</Link>
        </li>
        <li>
          <Link className="nav-link" to='/users/create'>Create User</Link>
          </li>
        <li>
          <Link className="nav-link" to='/products'>Products</Link>
          </li>
      </ul>
    </div>
  )
}

export default Nav;
