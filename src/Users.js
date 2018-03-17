/* eslint-disable */
import React from 'react';
import axios from 'axios';
import store, { getAllUsers } from './store';
import UserCreate from './UserCreate';

export default class Users extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })

    axios.get('/api/users')
      .then( res => res.data)
      .then( users => {
        store.dispatch(getAllUsers(users))
      })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { users } = this.state
    return (
      <div>
        <h2>These are our users</h2>
        <UserCreate />
        <ul>
          {
            users &&
            users.map( user => (
              <li key={ user.id }>{user.name}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

