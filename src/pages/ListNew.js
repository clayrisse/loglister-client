import React, { Component } from 'react'
import { withAuth } from '../context/auth-context';
import serverService from '../lib/server-service';

class ListNew extends Component {
    state = { 
        name: "",
        type: "list", 
        background: "",
        editorsName: ""
    }
   
    handleFormSubmit = event => {
        event.preventDefault();
        const { name, type, background, editorsName  } = this.state;
        const listData = { name, type, background, editorsName  } 

        serverService.createList(listData)
        .then( (createdList) => {
            const newListId = createdList.data._id
            this.props.history.push(`/list/${newListId}`);     
        })
        .catch ((err) => console.log(err))

      };
    
      handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };

    
      render() {
        const { name, type, background, editorsName } = this.state;
        return (
          <div>
            <h1>list new</h1>
    <br/> <br/>
            <form onSubmit={this.handleFormSubmit}>
              
              <label>Name:</label>
              <input type="text" name="name" value={name} onChange={this.handleChange} required/>
    <br/>
              <label>Type:</label>
              <select value={type} onChange={this.handleChange} name="type" >
                    <option value="list" default>list</option>
                    <option value="todo">todo</option>
                    <option value="log">log</option>
                    <option value="cyclelist">cyclelist</option>
              </select>
    <br/>
              <label>Background:</label>
              <input type="text" name="background" value={background} onChange={this.handleChange} />
    <br/>
              <label>Editor's Username:</label>
              <input type="text" name="editorsName" value={editorsName } onChange={this.handleChange} />
    <br/>
 
              <button type="submit" className="btnform" >Create List</button>
            </form>
          </div>
        );
      }
}

export default withAuth(ListNew)
