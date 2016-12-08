import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router'
import App from './App';
import Post from './Post';
import Square from './Square';
import './index.css';

ReactDOM.render(
  <Router history={hashHistory}>
  <Route path="/" component={App}></Route>
  <Route path="/square" component={Square}></Route>
  <Route path="/:postId" component={Post}></Route>
</Router>, document.getElementById('root'));