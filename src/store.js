/* eslint-disable */
import { createStore } from 'redux'

const GET_ALL_USERS = 'GET_ALL_USERS';
const CHANGE_USER_NAME = 'CHANGE_USER_NAME';
const ADD_USER = 'ADD_USER';
const DELETE_USER = 'DELETE_USER';
const SELECT_USER = 'SELECT_USER';
const UPDATE_USER = 'UPDATE_USER';

const initialState = {
  users: [],
  user: {},
  newName: ''
}

export const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

export const changeUserName = (newName) => {
  return {
    type: CHANGE_USER_NAME,
    newName
  }
}

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user
  }
}

export const deleteUser = (id) => {
  const users = store.getState().users.filter(user => user.id !== id*1)
  return {
    type: DELETE_USER,
    users
  }
}

export const updateUser = (user) => {
  const users = store.getState().users.filter( u => u.id !== user.id)
  return {
    type: UPDATE_USER,
    clear: ''

  }
}

export const selectUser = (user) => {
  return {
    type: SELECT_USER,
    user
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return Object.assign({}, state, { users: action.users });
    case 'CHANGE_USER_NAME':
      return Object.assign({}, state, { newName: action.newName });
    case 'ADD_USER':
      return Object.assign({}, state, { users: [...state.users, action.user], newName: '' })
    case 'DELETE_USER':
      return Object.assign({}, state, { users: action.users });
    case 'SELECT_USER':
      return Object.assign({}, state, { user: action.user });
    case 'UPDATE_USER':
      return Object.assign({}, state, { newName: action.clear })
    default:
      return state;
  }
}

const store = createStore(reducer)

export default store;
