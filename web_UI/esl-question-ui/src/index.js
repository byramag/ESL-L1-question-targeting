import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import SiteNavbar from './components/Nav';
// import Interface from './QuestionAPIInterface';
import reportWebVitals from './reportWebVitals';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

ReactDOM.render(
  <React.StrictMode>
    <SiteNavbar />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
