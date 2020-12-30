import React, { Component } from 'react'
import ItemAdd from '../components/ItemAdd';
import ItemDisplay from '../components/ItemDisplay';
import ListEdit from '../components/ListEdit';
import { withAuth } from '../context/auth-context';
import serverService from '../lib/server-service'
import './ListDetail.css'

class ListDetail extends Component {
    state = {
        chosenList:[],
        itemListArr:[],
        settingsOn: false,
        isDone: false
      }
    
    toggleListEdit = () => {
        console.log('this.props.user._id', this.props.user._id)
        console.log('this.state.chosenList.ownerId', this.state.chosenList.ownerId)
        this.setState( {settingsOn: !this.state.settingsOn} )}
    
    goToUserPage = () => this.props.history.push(`/user`)
    
    getListInfo = () => {
        const { listId } = this.props.match.params;
        serverService.getOneList(listId) //axios call from service
            .then((response) => {
            this.setState({chosenList: response.data, itemListArr: response.data.listItems})
            })
            .catch((err) => console.log(err)) 
    } 
      
    componentDidMount() {
    this.getListInfo()
    }

    
    render() {
        return (
            <div className="dad-div">
                <h1>{this.state.chosenList.name}</h1>
                <p>{this.state.ownerId}</p>
                <button className="btnsetting" onClick={this.toggleListEdit}><img src="./../icons/settings.png" height="20px" alt="trash"/></button>
                <br/> 
                {this.state.settingsOn && 
                    <ListEdit 
                        goToUserPage={this.goToUserPage} 
                        getListInfo={this.getListInfo} 
                        listInfo={this.state.chosenList} 
                        toggleListEdit={this.toggleListEdit}
                    />
                }

                <ItemAdd listId={this.state.chosenList._id} getListInfo={this.getListInfo}/>
             <br/>
                <hr className="hr-big"/> 
                <div className="listing">
                    <h2>Still to do</h2>
                    <br/>
                    {this.state.itemListArr.map((eachItemInfo) => {
                        return !eachItemInfo.isDone && <ItemDisplay 
                            key={eachItemInfo._id} 
                            itemId={eachItemInfo._id} 
                            getListInfo={this.getListInfo}
                        /> 
                        })
                    }
                </div>

             <br /> 
                <hr className="hr-big"/> 
                <div className="listing">
                    <h2>Done</h2>
                    <br/>
                        {this.state.itemListArr.map((eachItemInfo) => {
                            return eachItemInfo.isDone && <ItemDisplay 
                                key={eachItemInfo._id} 
                                itemId={eachItemInfo._id} 
                                getListInfo={this.getListInfo}
                            /> })
                        }
                </div>
            </div> 
        
    )   
   
    }
}

export default withAuth(ListDetail)




// {this.state.itemListArr.map((eachItemInfo, i) =>  {
//     return(
//         <div key={eachItemInfo._id}>
//         <div className="inputform">
//     <label>Locked</label>
//     {/* <input type="checkbox" checked={this.state.isDone}  id="isDone-input" name="isDone"  
//      onChange={()=>this.handleIsDoneCheck(i,eachItemInfo._id)} /> */}
//     <input type="checkbox" checked={eachItemInfo.isDone}  id="isDone-input" name="isDone" 
//     onChange={this.handleIsDoneCheck} />
// </div> 
//             <p>{this.state.itemListArr[i]._id}</p>
//             <p>{eachItemInfo._id}</p>
//             <p>{eachItemInfo.title}</p>
//             {/* <ItemDisplay itemId={eachItemInfo._id}  /> */}
//         </div>
//     )}



// <button className='add' onClick={this.toggleListEdit}>
// {
//     !this.state.settingsOn 
//     ? <span>UNDO ❌</span>
//     : <span>✅</span>
// }
// </button>
// <br/><br/>