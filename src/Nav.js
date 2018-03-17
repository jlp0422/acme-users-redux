/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to='/users'>Users</Link>
        </li>
        <li>
          <Link to='/users/create'>Create User</Link>
          </li>
        <li>
          <Link to='/products'>Products</Link>
          </li>
      </ul>
    </div>
  )
}

export default Nav;
