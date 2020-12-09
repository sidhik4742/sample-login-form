import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import Login from './Component/Login/Login';
import Footer from './Component/Footer/Footer';
import Home from './Component/Home/Home';

function App() {
  console.log('====================================');
  console.log("App.js");
  console.log('====================================');
  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <Login />
          <Footer />
        </Route>
        <Route path="/home" >
          <Home/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
