import React, { Component } from 'react'
import { withAuth } from '../context/auth-context';
import { Link } from "react-router-dom";
import serverService from '../lib/server-service'

class Settings extends Component {
    state = { username: "", password: "", isPrivate: true };

    getUserInfo = () => {
        console.log('this.props.user', this.props.user)
        console.log('----------------------', this.props.user)
        serverService.getAllUserInfo() //axios call from service
          .then((response) => {
            console.log('response.data', response.data)
            this.setState({
                username: response.data.username, 
                password: response.data.password, 
                isPrivate: response.data.isPrivate
            })
          })
          .catch((err) => console.log(err)) // con axios results is on `response.data` key
      } 

    handleIsPrivateCheckbox = (event) => {
        const { name, checked } = event.target;
        console.log("-----------------",checked)
        this.setState({ [name]: checked });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { username, password, isPrivate } = this.state;
        console.log('isPrivate????????????', isPrivate)
        const user = { username, password, isPrivate } 
        

        serverService.editUser(user)
        .then( () => {
            this.getUserInfo()
            this.props.me()  
            this.props.history.push("/user");          
        })
        .catch ((err) => console.log(err))

    };

    handleDelete = () => {
        serverService.deleteUser()
        .then(() =>{
            this.props.destroyUser()
            this.props.history.push("/")
        })
        .catch ((err) => console.log(err))
    }
     
    componentDidMount() {
        this.getUserInfo()
    }
  
    render() {
      const { user, logout} = this.props;
      const { username, password, isPrivate } = this.state;

      return (
        <div>
            <h1>Change Settings</h1>
                <br/>
            <button className="navbar-title" onClick={logout}>Logout</button>
                <br/>
            <form onSubmit={this.handleFormSubmit}>
                <div className="inputform">
                    <label>Locked</label>
                    <input type="checkbox" checked={isPrivate}  id="private-input" name="isPrivate" onChange={this.handleIsPrivateCheckbox} />
                </div>  
                <br/>
                    <br/>

                <label>Username:</label>
                <input type="text" name="username" value={username} onChange={this.handleChange} />
                    <br/> <br/>
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={this.handleChange} />
                    <br/> <br/> <br/>
                <button className="btnform" type="submit">Save Changes</button>
            </form>
                <br/> <br/> <br/>


            <button className="btnform" onClick={() => this.handleDelete()}>Delete User</button> 
        </div>
      );
    }
}

export default withAuth(Settings)
