import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store/store'

import jwt_decode from 'jwt-decode';
import setAuthToken from './helpers/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileAction';

import PrivateRoute from './components/common/PrivateRoute'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Copyright from './components/layout/Copyright'
import Register from './components/authentification/Register'
import Login from './components/authentification/Login'
import Recipes from './components/recipes/Recipes'
import Recipe from './components/recipes/Recipe'
import Dashboard  from './components/dashboard/Dashboard'
import CreateProfile  from './components/dashboard/CreateProfile'
import CreateRecipe  from './components/recipes/CreateRecipe'
import MyFavorites from './components/dashboard/Favorites'


import './css/App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // clear profile before logout
    store.dispatch(clearCurrentProfile  ());
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {

  render() {
    return (
      <Provider store={ store }>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="app-container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/recipe/:id" component={Recipe} />
            <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
          <Switch>
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        </Switch>
        <Switch>
        <PrivateRoute exact path="/create-recipe" component={CreateRecipe} />
      </Switch>
      <Switch>
      <PrivateRoute exact path="/favorites" component={MyFavorites} />
    </Switch>
          </div>
          <Copyright />
        </div>
     </Router>
   </Provider>
    );
  }
}

export default App;
