import React, { Component } from 'react'
import ItemAdd from '../components/ItemAdd';
import ListEdit from '../components/ListEdit';
import { withAuth } from '../context/auth-context';
import serverService from '../lib/server-service'

class ListDetail extends Component {
    state = {
        chosenList:[],
        itemListArr:[],
        settingsOn: false
      }
    
    toggleListEdit = () => {
        console.log('this.props.user._id', this.props.user._id)
        console.log('this.state.chosenList.ownerId', this.state.chosenList.ownerId)
        this.setState( {settingsOn: !this.state.settingsOn} )}
    
    goToUserPage = () => this.props.history.push(`/user`)
    
    getUserInfo = () => {
        const { listId } = this.props.match.params;
        serverService.getOneList(listId) //axios call from service
            .then((response) => {
            this.setState({chosenList: response.data, itemListArr: response.data.listItems})
            })
            .catch((err) => console.log(err)) 
    } 
      
    componentDidMount() {
    this.getUserInfo()
    }

    render() {
        return (
            <div>
                list Deeeeeetail
                <br/><br/>

                <button className='add' onClick={this.toggleListEdit}><span>settings</span></button>
                <br/> <br/>

                {this.state.settingsOn && <ListEdit goToUserPage={this.goToUserPage} getUserInfo={this.getUserInfo} listInfo={this.state.chosenList} toggleListEdit={this.toggleListEdit}/>}
                <br/> <br/>
                {/* {this.state.formOn && <AddFoodForm addOneFood={this.addOneFood} />
        } */}

                <br/><br/>
             
                <h2>{this.state.chosenList.name}</h2>
                <h2>{this.state.chosenList._id}</h2>

                <br/><br/><br/><br/>
                <ItemAdd listId={this.state.chosenList._id} getUserInfo={this.getUserInfo}/>
                <br/><br/>
                {this.state.itemListArr.map((eachItem, i) =>  {
                    return(
                        <div key={i}>
                            <p>{eachItem.title}</p>
                        </div>
                    )}
                )}
                <br/> <br/> <br/>
                        <h1>DONE</h1>
                        <br/>
                {this.state.itemListArr.map((eachItem, i) =>  { 
                    return eachItem.isDone && <p>{eachItem.title}</p>
                   }
                )}
                   
            </div> 
         
        )   
   
    }
}

export default withAuth(ListDetail)




// <button className='add' onClick={this.toggleListEdit}>
// {
//     !this.state.settingsOn 
//     ? <span>UNDO ❌</span>
//     : <span>✅</span>
// }
// </button>
// <br/><br/>