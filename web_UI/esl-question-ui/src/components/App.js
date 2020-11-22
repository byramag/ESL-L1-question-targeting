/*
 Handles the shared functionalities between components
*/
import React, { useState } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import '../css/App.css';

import Home from './Home'
import About from './About'
import QuizForm from './QuizForm'

function App() {

  // const [location, setLocation] = useState('/')

  return (
    <div className="App">
      <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={ Home } />
        <Route path="/about" component={ About } />
        <Route path="/quizform" component={ QuizForm } />
      </Router>
    </div>
  );
}

export default App;
