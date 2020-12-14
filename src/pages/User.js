import React, { Component } from "react";
import { withAuth } from '../context/auth-context';
// import { Link } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import userService from './../lib/user-service'

class User extends Component {
  // constructor (props) {
  //   super (props)
  //     this.state = {
  //       userInfo: props.user,
  //       infoShown:{}
  //   }
  // }

  state = {
    userInfo: {},
    infoShown: {}
  }

  getUserInfo = () => {
    userService.getAllUserInfo() //axios call from service
      .then((response) => this.setState({userInfo: response.data, infoShown: response.data.listsId[4]}))
      .catch((err) => console.log(err)) // con axios results is on `response.data` key
  } 
  

  componentDidMount() {
    this.getUserInfo()
  }

  render() {
    return (
      <div>
        <h1>Private Route</h1>
        <h2>Welcome {this.props.user && this.props.user.username}</h2>
        {/* <h2>Welcome {this.state.infoShown}</h2> */}
        {/* <h2>Welcome {this.state.userInfo.listsId[4].name}</h2> */}
        {/* <h2>Welcome {this.state.userInfo.listsId[4].name}</h2> */}
        {/* <h2>Welcome {this.props.user && this.props.user.listsId}</h2> */}
        {/* 
        <h2>Welcome {this.props.user ? this.props.user.username : null }</h2> 
        */}
        

        
        {/* {this.state.userInfo.listsId.map(eachlist => {
            return(
                <div key={eachlist._id}>
                        <h3>{eachlist.name}</h3>
                </div>
            )
        })
        } */}
       
             
     
    




      </div>
    );
  }
}


export default withAuth(User);
