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
        <h1>{this.props.user && this.props.user.username}</h1>
        <br/>
        <hr className="hr-big"/> 
        <div className="listing">
          <h2>Listas</h2>
          <br/>
          {this.state.listArr.map((eachlist, i) => {
            return(
              <div key={eachlist._id}>
                <div className="itemrow">
                    <Link to={`list/${eachlist._id}`}>{eachlist.name}</Link>
                </div>
                <hr className="hr-small"/> 
              </div>
            )})
          }
          <br/>
          {this.state.editorsArr.map((eachlist, i) => {
            return(
              <div key={eachlist._id}>
                <div className="itemrow item-editor">
                  <Link to={`list/${eachlist._id}`}>{eachlist.name}</Link>
                </div>
                <hr className="hr-small"/> 
              </div>
            )})
          }
          <br/>
        </div>
        <hr className="hr-big"/> 
        <div className="listing">
          <h2>Things to do</h2>
          <br/>
          {this.state.listArr.map((eachlist, i) => eachlist.listItems.map(listItem => {
            if (listItem.isDone === false) {
              return(
                <div key={listItem._id}>
                    <div className="itemrow">
                      <Link to={`list/${listItem.listId}`}>{listItem.title}</Link>
                    </div>
                    <hr className="hr-small"/> 
                </div>
              )}}))
          }
          {/* <br/> */}
          {this.state.editorsArr.map((eachlist, i) => eachlist.listItems.map(listItem => { 
            if (listItem.isDone === false) {
              return (
                <div key={listItem._id}>
                    <div className="itemrow item-editor">
                      <Link to={`list/${listItem.listId}`}>{listItem.title}</Link>
                          {/* <h3>{listItem.title}</h3> */}
                    </div>
                  <hr className="hr-small"/> 
                </div>
              )}}))
          }
        </div>
        <br/>
      </div>
    );
  }
}


export default withAuth(User);
