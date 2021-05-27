import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home.js';
import Nav from './components/Nav/Nav';

export default function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={Home}></Route>
      <Route path='/home' component={Nav}></Route>
    </React.Fragment>
  )
}
