import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home.js';
import Nav from './components/Nav/Nav';
import Map from './components/Map/Map';
import Footer from './components/Footer/Footer';
import SignIn from './components/SignIn/SignIn';
import CreatePet from './components/CreatePet/CreatePet';
import ProfileContainer from './components/Profile/ProfileContainer';

export default function App() {
  return (
    <React.Fragment>
      <Route exact path='/' component={SignIn}></Route>
      <Route path='/home' component={Nav}></Route>
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/home/map' component={Map}></Route>
      <Route exact path='/home/profile' component={ProfileContainer}></Route>
      <Route exact path='/home/profile/add' component={CreatePet}></Route>
      <Route path='/' component={Footer}></Route>
    </React.Fragment>
  )
}
