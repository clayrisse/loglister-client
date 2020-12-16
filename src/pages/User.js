import React, { Component } from "react";
import { withAuth } from '../context/auth-context';
import { Link } from 'react-router-dom';
import serverService from '../lib/server-service'

class User extends Component {
  // constructor(props) {
  //   super (props)
  //   this.state = {
  //     listArr: [],
  //     infoShown: ""
  //   }
  //   console.log('props', props)
  // }
  

  state = {
    listArr: [],
    editorsArr: [],
    infoShown: ""
  }

  getUserInfo = () => {
    serverService.getAllUserInfo() //axios call from service
      .then((response) => {
        console.log('response.data derrr user-----------', response.data)
        this.setState({listArr: response.data.listsId, editorsArr: response.data.editorsListsId, infoShown: JSON.parse(JSON.stringify(response.data))})
      })
      // .then(({ data }) => {
      //   // data
      //   console.log('response.data derrr user-----------', data)
      //   // this.setState({listArr: data})
      //   this.setState({listArr: data.listsId, infoShown: data})
      // })
      .catch((err) => console.log(err)) // con axios results is on `response.data` key
  } 
  

  componentDidMount() {
    this.getUserInfo()
  }

  //listsId[1].name
  render() {
    return (
      <div>
        <h1>Private Route</h1>
        <h2>Welcome {this.props.user && this.props.user.username}</h2>
        {/* <h2>Welcome {this.props.user && this.props.user.listsId[1].name}</h2> */}
        <br/>
         <h1>{this.state.infoShown.username}</h1>
        {/* <h1>{this.state.infoShown.listsId[3].name ? this.state.infoShown.listsId[1].name : null}</h1> */} 
        {/* <h1>{this.state.infoShown.listsId[3].name }</h1>  */}
<hr/><br/>
        {this.state.listArr.map((eachlist, i) => {
          return(
            <div key={i}>
              <Link to={`list/${eachlist._id}`}>{eachlist.name}</Link>
            </div>
          )
        })
        }
<br/><hr/><br/>
        {this.state.editorsArr.map((eachlist, i) => {
          return(
            <div key={i}>
              <Link to={`list/${eachlist._id}`}>{eachlist.name}</Link>
            </div>
          )
        })
        }
 <br/><hr/><br/> 
        {this.state.listArr.map((eachlist, i) => eachlist.listItems.map(listItem => {
            return(
                <div key={listItem._id}>
                        <h3>{listItem.title}</h3>
                </div>
            )
        }))
        }
<br/><hr/><br/>   
        {this.state.editorsArr.map((eachlist, i) => eachlist.listItems.map(listItem => {
            return(
                <div key={listItem._id}>
                        <h3>{listItem.title}</h3>
                </div>
            )
        }))
        }
<br/><hr/>
    




      </div>
    );
  }
}


export default withAuth(User);
