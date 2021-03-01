import React, { Component } from 'react';
import serverService from '../lib/server-service';

class ListEdit extends Component {
    state = { 
        name: "",
        type: "list", 
        background: "",
        editorsName: "",
        isPrivate: true,
        deleteconfirm: false
    }
    
    handleIsPrivateCheckbox = (event) => {
        const { name, checked } = event.target;
        this.setState({ [name]: checked });
    };
    
    toggleDeleteConfirm = (event) => {
        event.preventDefault()
        this.setState( {deleteconfirm: !this.state.deleteconfirm} )
    }
    
    handleDeleteList = (event) => {
        const  idList  = this.props.listInfo._id;
        serverService.deleteOneList(idList)
        .then( (deletedList) => {
            console.log('deletedList', deletedList)
            // const newListId = createdList.data._id
            // this.props.toggleListEdit()
            // this.props.getListInfo()
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
            
            this.props.getListInfo()
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
          <div className="list-edit">
            <form onSubmit={this.handleFormSubmit}>

                <button type="submit" className="btnform" >Edit List</button>        <br/> <br/>
                    <div className="inputform">
                        <label>Locked</label>
                        <br/>
                        <input type="checkbox" checked={isPrivate}  id="private-input" name="isPrivate" onChange={this.handleIsPrivateCheckbox} />
                    </div>          <br/>      
                <label>Name:</label>        <br/>      
                <input type="text" name="name"  placeholder={name} onChange={this.handleChange} />        <br/><br/>
                <label>Type:</label>        <br/>
                <select placeholder={type} onChange={this.handleChange} name="type" >
                        <option value="list" >list</option>
                        <option value="todo" default>todo</option>
                        <option value="log">log</option>
                        <option value="cyclelist">cyclelist</option>
                </select>        <br/><br/>
                <label>Background:</label>        <br/>
                <input type="text" name="background" placeholder={background} onChange={this.handleChange} />        <br/><br/>
                <label>Editor's Username:</label>        <br/>
                <input type="text" name="editorsName" value={editorsName} onChange={this.handleChange} />        <br/> <br/>
                {/* <button onClick={this.toggleDeleteConfirm}>Delete List</button>  */}
                <button onClick={this.toggleDeleteConfirm}><img src="./../icons/trash.png" height="30px" alt="trash"/></button> 
                {  this.state.deleteconfirm && (
                    <>
                    <p>Are you sure you want to delete this list?</p>
                    <button onClick={this.toggleDeleteConfirm}>NO</button> 
                    <button onClick={this.handleDeleteList}>YES</button> 
                    </>
                )}
                
            </form>
          </div>
        );
    }
}

export default ListEdit
