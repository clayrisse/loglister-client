import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth )
    this.props.login(username, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleFormSubmit}>
<br/> 
<br/>
          <label>Username:</label>
<br/>
          <input type="text" name="username" value={username} onChange={this.handleChange} required/>          
<br/> 
<br/>
          <label>Password:</label>
<br/>
          <input type="password" name="password" value={password} onChange={this.handleChange} required />
<br/> <br/>
          <input type="submit" value="Login" />
        </form>
<br/> <br/>

        <p>Already have account?</p>
        <Link to={"/signup"}>Go to "Sign up"</Link>
      </div>
    );
  }
}

export default withAuth(Login);
