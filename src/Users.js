/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store, { deleteUser, selectUser, getAllUsers } from './store';
import UserCreate from './UserCreate';

export default class Users extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
    this.onDeleteUser = this.onDeleteUser.bind(this)
    this.onEditUser = this.onEditUser.bind(this)
  }

  componentDidMount() {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        store.dispatch(getAllUsers(users))
      })
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
    console.log(this.state)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onDeleteUser(id) {
    axios.delete(`/api/users/${id}`)
      .then( res => res.config.url)
      .then( url => url.split('/')[3])
      .then( userid => {
        const action = deleteUser(id)
        store.dispatch(action)
      })
  }

  onEditUser(user) {
    const action = selectUser(user)
    store.dispatch(action)
  }

  render() {
    const { users } = this.state
    const { onDeleteUser, onEditUser } = this
    return (
      <div>
        <h2>These are our users</h2>
        <UserCreate />
        <ul>
          {
            users &&
            users.map( user => (
              <li key={ user.id }>
              {user.name}&nbsp;&nbsp;
              <Link to={`/users/${user.id}`}>
                <button onClick={() => onEditUser(user)}>Edit</button>
              </Link>
              &nbsp;&nbsp;
              <button onClick={() => onDeleteUser(user.id)}>Delete</button>
              <br /><br />
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

