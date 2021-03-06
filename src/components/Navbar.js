import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { withAuth } from './../context/auth-context';
// import user from './../icons/user.png'
import "./Navbar.css"

class Navbar extends Component {
  render() {
    // const { user, logout, isLoggedIn } = this.props;
    return (
      <nav className=" navbar navbar-bottom"> 
       <div className="" id="nav">
       <ul className="navbar-nav">
  
        {this.props.isLoggedIn && (
          <>
            {/* <li className="nav-item">
              <div className="navbar-texticon">
                <p>username: {this.props.user && this.props.user.username}</p>
                <a href="#nav" onClick={this.props.logout}>Logout</a>
              </div>
            </li> */}

            <li className="nav-item">
              <div className="navbar-texticon">
                <NavLink className="navbar-icontitle navbar-button" to="/user">
                  {/* <img className="navbar-icon" alt="nav-icon" src={user}/> */}
                  <img id="nav-avatar" className="navbar-icon" alt="nav-icon" src={this.props.user.image ? this.props.user.image : "./../icons/user.png"}/>
                  <p className="navbar-title">My Logs</p>
                </NavLink>
              </div>
            </li>

            {/* <li className="nav-item">
              <div className="navbar-texticon">
                <NavLink className="navbar-icontitle navbar-button" to="/favorites">
                  <img className="navbar-icon" alt="nav-icon" src="./../icons/search.png"/>
                  <p className="navbar-title">Favorites</p>
                </NavLink>
              </div>
            </li> */}
           
            <li className="nav-item">
              <div className="navbar-texticon">
                <NavLink className="navbar-icontitle navbar-button" to="/list/new">
                  <img className="navbar-icon" alt="nav-icon" src="./../icons/addwhite.png"/>
                  <p className="navbar-title">New list</p>
                </NavLink>
              </div>
            </li>
         
            <li className="nav-item">
              <div className="navbar-texticon">
                <NavLink className="navbar-icontitle navbar-button" to="/settings">
                  <img className="navbar-icon" alt="nav-icon" src="./../icons/settings.png"/>
                  <p className="navbar-title">Settings</p>
                </NavLink>
              </div>
            </li>
          </>
        )}
          </ul>
        </div>
      </nav>
    );
  }
}
export default withAuth(Navbar);



// <Link to="/user" className="navbar-button">My Logs</Link>
// <Link to="/favorites" className="navbar-button">Favorites</Link>
// <Link to="/newlist" className="navbar-button">+List</Link>
// <Link to="/settings" className="navbar-button">Settings</Link>

  // : (
  //   <>
  //     <Link to="/login"className="navbar-button">Login</Link>
  //     <Link to="/signup"className="navbar-button">Sign Up</Link>
  //   </>
  // )