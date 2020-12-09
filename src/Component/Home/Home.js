import React from 'react';
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import HomeContent from '../HomeContent/HomeContent';

function Home() {
    console.log('====================================');
    console.log("Home router");
    console.log('====================================');
  return (
    <div>
      This is home router;
      <Router>
        <Route path="/home/content">
          <HomeContent />
        </Route>
      </Router>
    </div>
  );
}

export default Home;
