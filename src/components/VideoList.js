import React from 'react'
import VideoItem from './VideoItem'
 
const VideoList = ({videos, onVideoSelect}) => {
// const VideoList = (props) => {
    // return <div>{props.videos.length} VideoList</div> 
    const mapingList = videos.map((vid)=>{
        return <VideoItem key={vid.id.videoId} video={vid} onVideoSelect={onVideoSelect}/>
    })
    
    return <div className="ui relaxed divided list">{mapingList}</div>  
}

export default VideoList