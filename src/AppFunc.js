import logo from './logo.svg';
import './App.css';
import News from './Components/News'
import LoadingBar from 'react-top-loading-bar'
import React, { Component, useState } from 'react'
import Navbar from './Components/Navbar';
import NewsFunc from './Components/NewsFunc'
import {
  BrowserRouter as Router,
    Switch,
  Route,
  Link
} from "react-router-dom";
export default function AppFunc () {
  apikey=process.env.REACT_APP_NEWS_API
  let [progress,setprogre]=useState(10)
  const setProgress=(progresss)=>{
   setprogre(progresss);
  }
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
      />
        <Switch>
          <Route exact  path="/">
          <NewsFunc setProgress={setProgress}  apikey={apikey}  key="general"  pagesize={5} country="in" category="general"/>
          </Route>
          <Route exact  path="/entertainment">
          <NewsFunc setProgress={setProgress}  apikey={apikey}  key="entertainement"  pagesize={5} country="in" category="entertainment"/>
          </Route>
          {/* <Route exact path="/bussiness">
          <NewsFunc setProgress={this.setProgress}  apikey={this.apikey}  key="business " pagesize={5} country="in" category="business"/>
          </Route>
          <Route  exact path="/sports">
          <NewsFunc setProgress={this.setProgress}  apikey={this.apikey}  key="sports" pagesize={5} country="in" category="sports"/>
          </Route>
          <Route exact path="/health">
          <NewsFunc setProgress={this.setProgress}  apikey={this.apikey}  key="health" pagesize={5} country="in" category="health"/>
          </Route>
          <Route exact path="/science">
          <News setProgress={this.setProgress}  apikey={this.apikey}  key="science" pagesize={5} country="in" category="science"/>
          </Route>
          <Route exact path="/technology">
          <News setProgress={this.setProgress}   apikey={this.apikey}  key="technology" pagesize={5} country="in" category="technology"/>
          </Route> */}
        </Switch>
        </Router>
      </div>
    )
  }
