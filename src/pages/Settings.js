import React, { Component } from 'react'
import { withAuth } from '../context/auth-context';
import serverService from '../lib/server-service';


class Settings extends Component {
    state = { username: "", password: "", image: "", isPrivate: false, deleteconfirm: false };

    getUserInfo = () => {
        serverService.getAllUserInfo() //axios call from service
          .then((response) => {
            this.setState({
                username: response.data.username, 
                password: response.data.password, 
                image: response.data.image, 
                isPrivate: response.data.isPrivate
            })
          })
          .catch((err) => console.log(err)) // con axios results is on `response.data` key
      } 

    handleIsPrivateCheckbox = (event) => {
        const { name, checked } = event.target;
        this.setState({ [name]: checked });
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { username, password, isPrivate, image } = this.state;
        const user = { username, password, isPrivate, image } 
        
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
            this.props.history.push("/login")
        })
        .catch ((err) => console.log(err))
    }
     
    componentDidMount() {
        this.getUserInfo()
    }

    toggleDeleteConfirm = () => this.setState( {deleteconfirm: !this.state.deleteconfirm} )


    handleFileUpload = (event) => {
        // console.log("The file to be uploaded is: ", event.target.files);
        const file = event.target.files[0];
        const uploadData = new FormData();
        uploadData.append("image", file);
    
        serverService.uploadImage(uploadData)
          .then((response) => {
            // console.log("response is: ", response);
            this.setState({ image: response.data.secure_url });
          })
          .catch((err) => {
            console.log("Error while uploading the file: ", err);
          });
      };
  
    render() {
      const { logout} = this.props;
      const { username, password, isPrivate } = this.state;

      return (
        <div>
            <h1>Change Settings</h1>
        <br/>
            <button className="navbar-title" onClick={logout}>Logout</button>
        <br/>
        <br/>
                <div className="inputform">
                    <label>Locked</label>
                    <input type="checkbox" checked={isPrivate}  id="private-input" name="isPrivate" onChange={this.handleIsPrivateCheckbox} />
                </div>  
        <br/>
            <form onSubmit={this.handleFormSubmit}>

                <label>Image</label><br/>
                <img style={{ width: "100px" }} src={this.state.image && this.state.image} alt="" />
        <br/>
                <input name="image" type="file" onChange={this.handleFileUpload} ></input>
        <br/>
        <br/>

                <label>Username:</label>
                <input type="text" name="username" value={username} onChange={this.handleChange} />
        <br/> 
        <br/>
                <label>Password:</label>
                <input type="password" name="password" value={password} onChange={this.handleChange} />
        <br/> 
        <br/>
                <button className="btnform" type="submit">Save Changes</button>
        <br/> <br/>
            </form>
                <button onClick={this.toggleDeleteConfirm}className="btnform" ><img src="./../icons/trash.png" height="15px" alt="trash"/>Delete User</button> 
        <br/> <br/>
                {  this.state.deleteconfirm && (
                    <>
                    <p>Are you sure?</p>
                    <button onClick={() => this.handleDelete()}>YES</button> 
                    <button onClick={this.toggleDeleteConfirm}>NO</button> 
                    <br/><br/>
                    </>
                )}

        </div>
      );
    }
}

export default withAuth(Settings)
