import React, { Component } from 'react'
import { withAuth } from '../context/auth-context';
import serverService from '../lib/server-service'

class ListDetail extends Component {
    state = {
        // listArr: [],
        // infoShown: ""
        chosenList:[],
        itemListArr:[]
      }

      getUserInfo = () => {
          console.log('this.props.match.params', this.props.match.params)
            const { listId } = this.props.match.params;
        serverService.getOneList(listId) //axios call from service
          .then((response) => {
            console.log('response.data', response.data)
            // this.setState({listArr: response.data.listsId, infoShown: response.data.listsId[4].name})
            this.setState({chosenList: response.data, itemListArr: response.data.listItems})
          })
          .catch((err) => console.log(err)) // con axios results is on `response.data` key
      } 
      
      consoleSee() {
         console.log('chosenList.listItems', this.state.chosenList.listItems)
         console.log('chosenList.listItems', typeof this.state.chosenList.listItems)
      }
    
      componentDidMount() {
        this.getUserInfo()
      }
    render() {
        return (
            <div>
                list Deeeeeetail
                <h2>{this.state.chosenList.name}</h2>
                {/* <button onClick={this.consoleSee()} >lets see</button> */}
                {/* <h2>{this.state.chosenList.listItems[0].title}</h2> */}
                {/* {this.state.chosenListitem.listItems.map((eachItem, i) =>  {
                    return(
                        <div key={i}>
                            <p>{eachItem.title}</p>
                        </div>
                    )}
                )} */}
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
