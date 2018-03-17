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
        <ul className="list-group">
          {
            users &&
            users.map( user => (
              <li className="list-group-item" style={{ }} key={ user.id }>
              {user.name}&nbsp;&nbsp;
              <Link to={`/users/${user.id}`}>
                <button className="btn btn-outline-success" onClick={() => onEditUser(user)}>Edit</button>
              </Link>
              &nbsp;&nbsp;
              <button className="btn btn-outline-danger" onClick={() => onDeleteUser(user.id)}>Delete</button>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

