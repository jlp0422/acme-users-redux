/* eslint-disable */
import React from 'react';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import Users from './Users'

export default class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>These are Acme Users and Products</h1>
        <Users />
      </div>
    )
  }
}
