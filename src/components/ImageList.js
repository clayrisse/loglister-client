import './ImageList.css'
import React from 'react'
import ImageCard from './ImageCard'


const ImageList = ({images, setBackground}) => {
    const imagesList = images.map((imgObj)=> <ImageCard 
        key={imgObj.id} 
        image={imgObj} 
        setBackground={setBackground}
    />)

    return (
        <div className="image-list">
            {imagesList}
        </div>
        )
}

export default ImageList
