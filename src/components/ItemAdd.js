import React, { Component } from 'react'
import serverService from '../lib/server-service';


class ItemAdd extends Component {
    state = {
        title: ""
    }
    
    handleFormSubmit = (event) => {
        event.preventDefault();
        const { title } = this.state;
        const listId = this.props.listId

        // serverService.createItem(listId, title)
        serverService.createItem(listId, title)
        .then( (addedItem) => {
            console.log('addedItem', addedItem)
            // const newListId = createdList.data._id
            this.props.getUserInfo()     
        })
        .catch ((err) => console.log(err))

      };
    
      handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };

    
      render() {
        return (
          <div>
            <form onSubmit={this.handleFormSubmit}>
              
              <button type="submit" className="btnform" >Add Item</button>
              
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} required/>
                
            </form>
          </div>
        );
      }
}

export default ItemAdd
