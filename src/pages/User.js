import React, { Component } from "react";
import { withAuth } from '../context/auth-context';
import { Link } from 'react-router-dom';
import serverService from '../lib/server-service'

class User extends Component {
  constructor(props) {
    super (props)
    this.state = {
      listArr: [],
      infoShown: ""
    }
    console.log('props', props)
  }
  

  state = {
    userInfo: [],
    infoShown: {}
  }

  getUserInfo = () => {
    serverService.getAllUserInfo() //axios call from service
      .then((response) => {
        console.log('response.data derrr user-----------', response.data)
        this.setState({listArr: response.data.listsId, infoShown: response.data.listsId[0].name})
      })
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
        <br/>
        <h2>{this.state.infoShown}</h2>

        
        {this.state.listArr.map((eachlist, i) => {
            return(
                <div key={i}>
                        <Link to={`list/${eachlist._id}`}>{eachlist.name}</Link>
                </div>
            )
        })
        }

        <br/> <br/> <br/> <br/>

        {this.state.listArr.map((eachlist, i) => eachlist.listItems.map(listItem => {
            return(
                <div key={listItem._id}>
                        <h3>{listItem.title}</h3>
                </div>
            )
        }))
        }
       
             
     
    




      </div>
    );
  }
}


export default withAuth(User);
