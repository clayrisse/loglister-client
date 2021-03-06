import React, { Component } from 'react';
import serverService from '../lib/server-service';
import "./ListEdit.css" 
import axios from "axios";

class ListEdit extends Component {
    state = { 
        name: "",
        type: "list", 
        background: "",
        backColor: "",
        backSearchWord: "",
        editorsName: "",
        isPrivate: true,
        deleteconfirm: false,
        backgroundAdd: false,
        backgroundApiObj: [],
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
    
    toggleBackgroundAdd = (event) => {
        event.preventDefault()
        this.setState( {backgroundAdd: !this.state.backgroundAdd} )
    }
    
    getBackgroundSearchText = () => {
        
    }
    handleBackgroundApiSearch = (event) => {
        event.preventDefault()
        axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=20&query=${this.state.backSearchWord}&client_id=`)
        // axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=5&query=london&client_id=${process.env.REACT_APP_UNSPLASH_APIKEY}`)
        .then((response) => {
            console.log('Api ratelimit-remaining', response.headers['x-ratelimit-remaining']);
            this.setState({ backgroundApiObj: response.data.results})
        })
        .catch((err) => console.log(err))
    }
    
    setBackground = (e, urlFromApi, colorFromApi) => {
        e.preventDefault()     
        this.setState({ background: urlFromApi, backColor: colorFromApi, backgroundAdd: !this.state.backgroundAdd });
    }
    
    handleFormSubmit = (event) => {
        event.preventDefault(); 
        const  idList  = this.props.listInfo._id;
        const { name, type, background, backColor, editorsName, isPrivate  } = this.state;
        const listData = { name, type, background, backColor, editorsName, isPrivate  } 
        console.log("qwqwqww", isPrivate)
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
    
    componentDidMount() {
        this.setState({ 
            background: this.props.listInfo.background, 
            backColor: this.props.listInfo.backColor,
            isPrivate: this.props.listInfo.isPrivate });
    }

    render() {
        const { name, type, editorsName} = this.props.listInfo;
        return (
            <div className="list-edit">
            <form onSubmit={this.handleFormSubmit}>
                <button type="submit" className="btnform" >Save List Changes</button>        <br/> <br/>
                
                <div className="inputform">
                    <label>Locked</label>   <br/>
                    <input type="checkbox" checked={this.state.isPrivate}  id="private-input" name="isPrivate" onChange={this.handleIsPrivateCheckbox} />
                </div>          <br/>      
                
                <label>Name:</label>        <br/>      
                <input type="text" name="name" placeholder={name} onChange={this.handleChange} />        <br/><br/>
                
                <label>Type:</label>        <br/>
                <select placeholder={type} onChange={this.handleChange} name="type" >
                        <option value="list" >list</option>
                        <option value="todo" default>todo</option>
                        <option value="log">log</option>
                        <option value="cyclelist">cyclelist</option>
                </select>        <br/><br/><br/>

                <button onClick={this.toggleBackgroundAdd}>
                    <img alt="Unsplash background" width="95px" src={this.state.background}/>
                    <p>Change background</p>
                </button>

                {  this.state.backgroundAdd && (
                    <>
                    {/* <form onSubmit={this.getBackgroundSearchText}> */}
                        <input type="text" name="backSearchWord" placeholder="Write a key search word"  onChange={this.handleChange} />        <br/>
                        <button onClick={this.handleBackgroundApiSearch}>Search</button>   <br/><br/>
                    {/* </form> */}
                    <ul>
                        {this.state.backgroundApiObj && this.state.backgroundApiObj.map((eachPicObj, i) => {
                            return(
                            <li className="glide__slide " key={eachPicObj.id}>
                            <button type="image" name="background" value={eachPicObj.urls.thumb} onClick={(e)=> this.setBackground(e, eachPicObj.urls.regular, eachPicObj.color)}>
                                <div id="yellow-hover" key={eachPicObj.id} className="boder-y">
                                    <div className="ig-img">
                                        <img alt="Unsplash background" src={eachPicObj.urls.thumb}/>
                                    </div>
                                </div>
                            </button>
                            </li>
                            )}
                        )}
                    </ul>
                    </>
                )}    


                <br/><br/><br/>
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
