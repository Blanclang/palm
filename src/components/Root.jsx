import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import Post from './post/Post';
import Square from './Square';
import SearchPage from './Search';
import Profile from './Profile';
import Login from './Login';

const Root = ({store}) => (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App } />
      <Route path="/404" component={ App } />
      <Route path="/login" component={ Login } />
      <Route path="/square" component={ Square } />
      <Route path="/search" component={ SearchPage } />
      <Route path="/:postId" component={ Post } />
      <Route path="/user/:userId" component={ Profile } />
    </Router>
  </Provider>
)

export default Root;

