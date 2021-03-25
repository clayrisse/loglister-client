import React from 'react';
import SearchBar from '../components/SearchBar';
import youtube from '../api/youtube';
import VideoList from '../components/VideoList';
import VideoDetail from '../components/VideoDetail';


const KEY = 'AIzaSyDunQOtOEP7WtaiiTO9MPcznaBlgSKWgz8'

// function Home() {
class Home extends React.Component{
  state = { videos : [], selectedVideo: null};
  
  onTermSubmit = (term) => {
    console.log(`term`, term)
    youtube.get('/search',{
      params: {
        q: term,
        part: 'snippet', 
        type: 'video',
        maxResults: 5,
        key: KEY
      }
    })
    .then((response)=> {
      console.log(`response`, response.data.items)
      this.setState( {videos:response.data.items, selectedVideo: response.data.items[0]})
    })
    .catch((err)=> console.log(`err`, err))
  
  }

  //call with async await for reference
  // onTermSubmit =  async term => {
  //   const response = await youtube.get('/search',{
  //     params: {
  //       q: term,
  //       part: 'snippet', 
  //       type: 'video',
  //       maxResults: 5,
  //       key: KEY
  //     }
  //   })
  //     this.setState( {videos:response.data.items})
  // }

  onVideoSelect = (video) => {
    console.log(`video`, video)
    this.setState({ selectedVideo:video})
  }
  componentDidMount() {
    this.onTermSubmit('cat')

  }
  render(){
    return (
      <div className="ui container"> 
        <img  className="homelogo" width="320px" alt="nav-icon" src="./../icons/loglister.png"/>
        <SearchBar onFormSubmit={this.onTermSubmit}/>
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo}/>
            </div>
            <div className="five wide column">
              <VideoList onVideoSelect={this.onVideoSelect} videos= {this.state.videos}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;

