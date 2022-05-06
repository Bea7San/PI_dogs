import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Details from './components/Details/Details'

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/create' component={Form} />
        <Route path='/doggy/:dogId' component={Details} />
        
      </div>
    </React.Fragment>

  );
}

export default App;
