import React, { Component } from 'react';
import './App.css';
import { Switch } from 'react-router-dom';
// import { Switch, Route } from 'react-router-dom';

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
import ListDetail from './pages/ListDetail';
// import serverService from './lib/server-service'


class App extends Component {
//   state = {
//     listArr: [],
//     infoShown: ""
// }

// getUserInfo = () => {
//   serverService.getAllUserInfo() //axios call from service
//     .then((response) => {
//       console.log('response.data', response.data)
//       this.setState({listArr: response.data.listsId, infoShown: response.data.listsId[4].name})
//     })
//     .catch((err) => console.log(err)) // con axios results is on `response.data` key
// } 

// componentDidMount() {
//   this.getUserInfo()
// }

  render() {
    return (
      <div className="container">
        <Navbar />
              
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />

          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/user" component={User} />
          {/* <PrivateRoute exact path="/user" render={(reactRouterProps) => ( <User {...reactRouterProps}  /> )} /> */}
          {/* <PrivateRoute exact path="/user" render={(reactRouterProps) => ( <User {...reactRouterProps} allLists={this.state.listArr} /> )} /> */}
          <PrivateRoute exact path="/favorites" component={Favorites} />
          <PrivateRoute exact path="/settings" component={Settings} />
          <PrivateRoute exact path="/list/new" component={ListNew} />
          <PrivateRoute exact path="/list/:listId" component={ListDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
