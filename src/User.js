/* eslint-disable */
import React from 'react'
import store, { getAllUsers, changeUserName, updateUser } from './store';
import axios from 'axios';

export default class User extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
    this.onChange = this.onChange.bind(this)
    this.onSaveUser = this.onSaveUser.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
    // console.log(this.state)
    this.setState({ newName: store.getState().user.name})
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onChange(ev) {
    const action = changeUserName(ev.target.value)
    store.dispatch(action)
  }

  onSaveUser(ev) {
    ev.preventDefault()
    const { user, newName } = this.state
    axios.put(`/api/users/${user.id}`, ({ name: newName }))
      .then( res => res.data)
      .then( user => {
        const action = updateUser(user)
        store.dispatch(action)
      })
      .then(() => location.hash = '/users')
  }

  render() {
    const { onChange, onSaveUser } = this
    const { newName } = this.state
    return (
      <form onSubmit={ onSaveUser }>
        <input value={ newName } onChange={ onChange }/>
        <button>Save User</button>
      </form>
    )
  }
}
