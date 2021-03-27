import React, { Component } from 'react';
import './App.css';
// import { Switch } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';
import Error from './pages/Error';

import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';
import Settings from './pages/Settings';
import ListAdd from './pages/ListAdd';
import ListDetail from './pages/ListDetail';
import Widgets from './pages-widgets/Widgets';
// import serverService from './lib/server-service'


class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
              
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/widgets" component={Widgets} />

          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />

          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/user" component={User} />
          {/* <PrivateRoute exact path="/user" render={(reactRouterProps) => ( <User {...reactRouterProps}  /> )} /> */}
          {/* <PrivateRoute exact path="/user" render={(reactRouterProps) => ( <User {...reactRouterProps} allLists={this.state.listArr} /> )} /> */}
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/list/new" component={ListAdd} />
          <PrivateRoute exact path="/list/:listId" component={ListDetail} />
          
          <Route component={Error} />
        </Switch>
      </div>
    );
  }
}

export default App;
