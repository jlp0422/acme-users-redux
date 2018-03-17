/* eslint-disable */
import React from 'react';
import axios from 'axios';
import store, { changeUserName, addUser, getAllUsers } from './store';

export default class UserCreate extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
    this.onUserAdd = this.onUserAdd.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onUserAdd(ev) {
    ev.preventDefault()
    const user = store.getState().newName
    axios.post('/api/users', {name: user})
      .then( res => res.data)
      .then( user => {
        const action = addUser(user)
        store.dispatch(action)
      })
      .then(() => location.hash = '/users')
  }

  onChange(ev) {
    const action = changeUserName(ev.target.value)
    store.dispatch(action)
  }

  render() {
    const { newName } = this.state
    const { onUserAdd, onChange } = this
    return (
      <div style={{ marginBottom: 20 }}>
        <form onSubmit={onUserAdd}>
          <input onChange={onChange} value={newName} />
          <button>Add User</button>
        </form>
      </div>
    )
  }
}
