import React, { Component } from 'react';
import serverService from '../lib/server-service';

class ListEdit extends Component {
    state = { 
        name: "",
        type: "list", 
        background: "",
        editorsName: "",
        isPrivate: true,
        deleteconfirm: true
    }
    
    handleIsPrivateCheckbox = (event) => {
        const { name, checked } = event.target;
        this.setState({ [name]: checked });
    };
    
    toggleDeleteConfirm = () => this.setState( {deleteconfirm: !this.state.deleteconfirm} )
    
    handleDeleteList = (event) => {
        const  idList  = this.props.listInfo._id;
        serverService.deleteOneList(idList)
        .then( (deletedList) => {
            console.log('deletedList', deletedList)
            // const newListId = createdList.data._id
            // this.props.toggleListEdit()
            // this.props.getUserInfo()
            this.props.goToUserPage();     
        })
        .catch ((err) => console.log(err)) 
    }

    handleFormSubmit = (event) => {
        event.preventDefault(); 
        const  idList  = this.props.listInfo._id;
        const { name, type, background, editorsName, isPrivate  } = this.state;
        const listData = { name, type, background, editorsName, isPrivate  } 


            console.log("edit sended------------")
        serverService.editList(idList, listData)
        .then( (createdList) => {
            console.log('createdList', createdList)
            
            this.props.getUserInfo()
            this.props.toggleListEdit()
            // const newListId = createdList.data._id
            // this.props.history.push(`/list/${newListId}`);     
        })
        .catch ((err) => console.log(err)) 
      };


    
      handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };


 
    
      render() {
        const { name, type, background, editorsName, isPrivate } = this.props.listInfo;
        return (
          <div>
    <br/> <br/>


    {/* {this.state.settingsOn && <ListEdit listInfo={this.state.chosenList} toggleListEdit={this.toggleListEdit}/>} */}

     
    <button onClick={this.toggleDeleteConfirm}><img src="./../icons/trash.png" height="30px" alt="trash"/></button> 
    {  !this.state.deleteconfirm && (
        <>
        <p>Are you sure?</p>
        <button onClick={this.handleDeleteList}>YES</button> 
        <button onClick={this.toggleDeleteConfirm}>NO</button> 
        <br/><br/>
        </>
    )}
    {/* <button onClick={()=>this.handleDeletePic()}><img src="./../icons/trash.png" height="30px" alt="trash"/></button>  */}
            <form onSubmit={this.handleFormSubmit}>

            <button type="submit" className="btnform" >Edit List</button>
    <br/> <br/>
                 <div className="inputform">
                    <label>Locked</label>
                    <input type="checkbox" checked={isPrivate}  id="private-input" name="isPrivate" onChange={this.handleIsPrivateCheckbox} />
                </div>  
    <br/>      
              <label>Name:</label>
              <input type="text" name="name"  placeholder={name} onChange={this.handleChange} />
    <br/>
              <label>Type:</label>
              <select placeholder={type} onChange={this.handleChange} name="type" >
                    <option value="list" >list</option>
                    <option value="todo" default>todo</option>
                    <option value="log">log</option>
                    <option value="cyclelist">cyclelist</option>
              </select>
    <br/>
              <label>Background:</label>
              <input type="text" name="background" placeholder={background} onChange={this.handleChange} />
    <br/>
              <label>Editor's Username:</label>
              <input type="text" name="editorsName" value={editorsName } onChange={this.handleChange} />
    <br/>
 
              
            </form>
          </div>
        );
    }
}

export default ListEdit
