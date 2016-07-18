import _ from 'lodash';
import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoDetail from './components/video_detail';
import VideoList from './components/video_list';
const API_KEY = 'AIzaSyDIRmTXnNIG1NzRhGNwRcdux4SJcvBoKBw';



class App extends Component {
  constructor(props){
    super(props);

    this.state = { videos: [],
       selectedVideo: null
      };
      this.videoSearch('surfboards');
  }
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }
  render(){

    const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300)
    return (
      <div>
        <h1 className="title">Simple React Youtube Search</h1>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}

// take component and put into the DOM
// jsx takes instantiate component
ReactDOM.render(<App />, document.querySelector('.container'))
