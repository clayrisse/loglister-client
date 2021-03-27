import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../context/auth-context';
import './Signup.css'

class Signup extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    
    this.props.signup( username, password );
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="signup">
        <h1>Sign Up</h1>
<br/> <br/>
        <form onSubmit={this.handleFormSubmit}>
          
          <label>Username:</label>
          <br/>
          <input type="text" name="username" value={username} onChange={this.handleChange} required/>
<br/> <br/>
          <label>Password:</label>
          <br/>
          <input type="password" name="password" value={password} onChange={this.handleChange} required/>
<br/> <br/>
          <input type="submit" value="Signup" />
        </form>
<br/> <br/>
        
        <p>Already have account?</p>
        <Link to={"/login"}>Go to "Login"</Link>
      </div>
    );
  }
}



export default withAuth(Signup);


// const EnhancedSignup = withAuth(Signup)
// export default EnhancedSignup;