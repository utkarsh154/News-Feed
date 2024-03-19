
import './App.css';
import Navbar from './Components/Navbar';

import React, { Component } from 'react'
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  pageSize=12
  apiKey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
            <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} country='us' category='general' />}></Route>
            <Route path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={this.pageSize} country='us' category='business' />}></Route>
            <Route path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} country='us' category='entertainment' />}></Route>
            <Route path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={this.pageSize} country='us' category='health' />}></Route>
            <Route path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={this.pageSize} country='us' category='science' />}></Route>
            <Route path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={this.pageSize} country='us' category='sports' />}></Route>
            <Route path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageSize} country='us' category='technology' />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}


