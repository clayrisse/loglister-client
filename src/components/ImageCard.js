import React, { Component } from 'react'

export class ImageCard extends Component {
    constructor (props) {
        super (props);
            this.state = {spans: 0}
            this.imageRef = React.createRef();
    }
    
    componentDidMount(){
        this.imageRef.current.addEventListener('load', this.setSpans)
    }

    setSpans = () => {
        const heigth = this.imageRef.current.clientHeight
        const spans = Math.ceil(heigth / 6.95 )
        this.setState({spans})
    }

    render() {
        const {description, urls, color} = this.props.image
        
        return (
            <div style= {{gridRowEnd:`span ${this.state.spans}`}} onClick={(e)=> this.props.setBackground(e, urls.regular, color)}>
                <img 
                    ref={this.imageRef}
                    alt={description}
                    src={urls.thumb}
                />
            </div>
        )
    }
}


export default ImageCard
