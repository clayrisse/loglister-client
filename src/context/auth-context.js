import React from 'react';
import authService from './../lib/auth-service';

const { Consumer, Provider } = React.createContext();


class AuthProvider extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: true,
    user: null
  }

  componentDidMount () {
    authService.me()
     .then((user) => this.setState({ isLoggedIn: true, user: user, isLoading: false }))
     .catch((err) => this.setState({ isLoggedIn: false, user: null, isLoading: false }));
  }
  
  signup = (username, password) => {
    authService.signup( username, password )
    .then((user) => this.setState({ isLoggedIn: true, user }) )
    .catch((err) => this.setState({ isLoggedIn: false, user: null }))
  }
  
  login = (username, password) => {
    authService.login( username, password )
    .then((user) => this.setState({ isLoggedIn: true, user }))
    .catch((err) => this.setState({ isLoggedIn: false, user: null }))
  }
  
  logout = () => {
    authService.logout()
      .then(() => this.setState({ isLoggedIn: false, user: null }))
      .catch((err) => console.log(err));
  }
  //added by CL
  me = () => { 
    authService.me()
      .then((user) => this.setState({ isLoggedIn: true, user: user, isLoading: false }))
      // .then((user) => this.setState({ isLoggedIn: true, user }))
      .catch((err) => this.setState({ isLoggedIn: false, user: null, isLoading: false }));
  }

  destroyUser = () => {
    this.setState({ isLoggedIn: false, user: null, isLoading: false })
  }


  render() {
    const { isLoggedIn, isLoading, user } = this.state;
    const { signup, login, logout, destroyUser, me } = this;
    
    if (isLoading) return <p>Loading</p>;
    
    return(
      <Provider value={{ isLoggedIn, isLoading, user, signup, login, logout, destroyUser, me }}  >
        {this.props.children}
      </Provider>
    )
  }

}


// HOC that converts regular component into a Consumer
const withAuth = (WrappedComponent) => {
  
  return class extends React.Component {
    render() {
      return(
        <Consumer>
          { (value) => {
            const { isLoggedIn, isLoading, user, signup, login, logout, destroyUser, me } = value;

            return (<WrappedComponent 
                      {...this.props}
                      isLoggedIn={isLoggedIn} 
                      isLoading={isLoading} 
                      user={user} 
                      signup={signup} 
                      login={login} 
                      logout={logout}
                      destroyUser={destroyUser}
                      me={me}
                    />)

          } }
        </Consumer>
        )
    }
}
}


export { AuthProvider, withAuth }