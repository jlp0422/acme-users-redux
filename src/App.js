/* eslint-disable */
import React from 'react';
import { Link, HashRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './Users'
import User from './User'
import UserCreate from './UserCreate'
import Nav from './Nav';
import Products from './Products';
import store from './store';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <div>
        <h1>These are Acme Users and Products</h1>

        <Router>
          <div>
            <Route path='/' component={ Nav } />
            <Switch>
              <Route path='/users/create' exact component={ UserCreate } />
              <Route path='/users/:id' exact component={ User } />
            </Switch>
            <Route path='/users' exact component={ Users }/>
            <Route path='/products' exact component={ Products } />
          </div>
        </Router>

      </div>
    )
  }
}
