import logo from './logo.svg';
import './App.css';
import News from './Components/News'
import LoadingBar from 'react-top-loading-bar'
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
export default class App extends Component {
  apikey=process.env.REACT_APP_NEWS_API
  state={
    progress:10
  }
  setProgress=(progresss)=>{
    this.setState({progress:progresss})
  }
  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={this.state.progress}
      />
        <Switch>
          <Route exact  path="/">
          <News setProgress={this.setProgress}  apikey={this.apikey}  key="general"  pagesize={5} country="in" category="general"/>
          </Route>
          <Route exact  path="/entertainment">
          <News setProgress={this.setProgress}  apikey={this.apikey}  key="entertainement"  pagesize={5} country="in" category="entertainment"/>
          </Route>
          <Route exact path="/bussiness">
          <News setProgress={this.setProgress}  apikey={this.apikey}  key="business " pagesize={5} country="in" category="business"/>
          </Route>
          <Route  exact path="/sports">
          <News setProgress={this.setProgress}  apikey={this.apikey}  key="sports" pagesize={5} country="in" category="sports"/>
          </Route>
          <Route exact path="/health">
          <News setProgress={this.setProgress}  apikey={this.apikey}  key="health" pagesize={5} country="in" category="health"/>
          </Route>
          <Route exact path="/science">
          <News setProgress={this.setProgress}  apikey={this.apikey}  key="science" pagesize={5} country="in" category="science"/>
          </Route>
          <Route exact path="/technology">
          <News setProgress={this.setProgress}  apikey={this.apikey}  key="technology" pagesize={5} country="in" category="technology"/>
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
