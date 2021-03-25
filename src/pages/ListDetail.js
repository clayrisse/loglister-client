import React, { Component } from 'react'
import ItemAdd from '../components/ItemAdd';
import ItemDisplay from '../components/ItemDisplay';
import ListEdit from '../components/ListEdit';
import { withAuth } from '../context/auth-context';
import serverService from '../lib/server-service'
import './ListDetail.css'

class ListDetail extends Component {
    state = {
        chosenList: {},
        colorGradient: "",
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
                const backColor = response.data.backColor + "ff"
                let colorGradient = this.hexToHSL((backColor)) // to be able to change luminace
                let colorX = colorGradient.split(",")
                colorX[2] = (Number((100-colorX[2].slice(0,-1))/1.5)+ Number(colorX[2].slice(0,-1))) + "%"
                colorGradient = colorX.join(",")
                
                this.setState({chosenList: response.data, colorGradient: colorGradient, itemListArr: response.data.listItems})
            })
            .catch((err) => console.log(err)) 

    } 

    hexToHSL (H) {
        // Convert hex to RGB first
        let r = 0, g = 0, b = 0, a = 1;

        if (H.length === 5) {
            r = "0x" + H[1] + H[1];
            g = "0x" + H[2] + H[2];
            b = "0x" + H[3] + H[3];
            a = "0x" + H[4] + H[4];
        } else if (H.length === 9) {
            r = "0x" + H[1] + H[2];
            g = "0x" + H[3] + H[4];
            b = "0x" + H[5] + H[6];
            a = "0x" + H[7] + H[8];
        }
        // Then to HSL
        r /= 255;
        g /= 255;
        b /= 255;
        a = (a / 255).toFixed(3);
        let cmin = Math.min(r,g,b),
            cmax = Math.max(r,g,b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
      
        if (delta === 0)      h = 0;
        else if (cmax === r)  h = ((g - b) / delta) % 6;
        else if (cmax === g)  h = (b - r) / delta + 2;
        else                 h = (r - g) / delta + 4;
      
        h = Math.round(h * 60);
      
        if (h < 0) h += 360;
      
        l = (cmax + cmin) / 2;
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
      
        return "hsla("+ h + "," + s + "%," + l + "%," + a + ")";
      }
  
    componentDidMount() {
       this.getListInfo()
    }

    
    render() {
        // const {backColor, background} = this.state.chosenList
        const {background} = this.state.chosenList
        return (
            <div className="personal-back" style={{ backgroundImage: `linear-gradient(to right, 
            ${this.state.colorGradient.slice(0,-6).concat("0)")} 10%,  
            ${this.state.colorGradient.slice(0,-6).concat("0.9)")} 10%,
            ${this.state.colorGradient.slice(0,-6).concat("0.9)")} 90%,
            ${this.state.colorGradient.slice(0,-6).concat("0)")} 30%
            ), url(${background}`}} > 
            
                <div className="dad-div">
                    <div className="transparent-back">
                    {/* </div> */}
                        {/* <img alt="test" src={this.state.chosenList.background}/> */}
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
                        { this.state.itemListArr.map((eachItem) => eachItem.isDone).includes(true) && (
                            <>
                            <h2>Done</h2>
                                <div className="listing"> 
                                    {this.state.itemListArr.map((eachItemInfo) => {
                                        return eachItemInfo.isDone && <ItemDisplay 
                                            key={eachItemInfo._id} 
                                            itemId={eachItemInfo._id} 
                                            getListInfo={this.getListInfo}/> 
                                    })
                                    }
                                </div>
                            </>
                        )} 
                    </div> 
                </div> 
            </div> 
        
    )   
   
    }
}

export default withAuth(ListDetail)