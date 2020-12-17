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
        serverService.createItem(listId, {title})
        .then( (addedItem) => {
            console.log('addedItem', addedItem)
            // const newListId = createdList.data._id
            
            this.props.getListInfo()     
        })
        .catch ((err) => console.log(err))
        this.setState({title: ""})
      };
    
      handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };

    
      render() {
        const { title } = this.state
        return (
          <div>
            <form onSubmit={this.handleFormSubmit}>
              <input type="text" name="title" value={title} onChange={this.handleChange} required/>
              <button type="submit" id="add-item-icon" className="btnform "><img src="./../icons/add.png" height="12px"  alt="trash"/></button>
            </form>
          </div>
        );
      }
}

export default ItemAdd
