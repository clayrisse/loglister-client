import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import ListNew from './pages/ListNew';



class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />


          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/user" component={User} />
          <PrivateRoute exact path="/favorites" component={Favorites} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/list/new" component={ListNew} />
          <PrivateRoute exact path="/list/:listId" component={ListNew} />
        </Switch>
      </div>
    );
  }
}

export default App;
