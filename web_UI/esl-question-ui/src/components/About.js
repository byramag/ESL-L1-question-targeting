/*
 About page of application: talks about the research, implications, assumptions, and future work
*/
import { Link } from 'react-router';
import React from 'react';
import '../css/App.css';

export default class About extends React.Component {

  render() {
    return (
      <div className="About">
        <body className="App-body">
          <h1>About Page</h1>
          <p>
            This is about page
          </p>
        </body>
      </div>
    );
  }
}
