import React, { Component } from 'react'
import serverService from '../lib/server-service'

class ItemDisplay extends Component {
    state = {
        title: "",
        notes: "",
        isDone: false
    }

    handleIsDoneCheck = (event) => {
      
        // const { name, checked } = event.target;
        // this.setState({ [name]: checked });
        
        //setState is asyncronous so I have to go around that to refresh directly on the DB
        //then db updates and comes back refreshing the state
        const isDone = !this.state.isDone 
        
        serverService.checkItem(this.props.itemId, {isDone})
        .then(() => this.props.getListInfo())
        .catch ((err) => console.log(err)) 
        
    };
        

    getItemInfo = (itemId) => {
        serverService.getOneItem(itemId) //axios call from service
        .then((response) => {
            this.setState({
                isDone: response.data.isDone, 
                title: response.data.title, 
                notes: response.data.notes
            })
        })
        .catch((err) => console.log(err)) 
    } 
      
    handleDeleteItem = (event) => {
        const  idItem  = this.props.itemId;
        serverService.deleteOneItem(idItem)
        .then( (deletedList) => {
            console.log('deletedList', deletedList)
            // const newListId = createdList.data._id
            // this.props.toggleListEdit()
            // this.props.getListInfo()
            this.props.getListInfo()
            // this.props.goToUserPage();     
        })
        .catch ((err) => console.log(err)) 
    }


    componentDidMount() {this.getItemInfo(this.props.itemId)}


    render() {
        return (
            <>
                <div className="itemrow">
                    <div clasName="leftrow">
                        <input type="checkbox" checked={this.state.isDone} name="isDone" onChange={this.handleIsDoneCheck} />
                        <label>{this.state.title}</label> 
                    </div>
                    <div clasName="rightrow">
                        <button onClick={this.handleDeleteItem} className="btnform btnsetting" ><img src="./../icons/trash.png" height="16px" alt="trash"/></button> 
                    </div>
                </div>
                <hr className="hr-small"/> 
            </>
                
        )
    }
}

export default ItemDisplay
