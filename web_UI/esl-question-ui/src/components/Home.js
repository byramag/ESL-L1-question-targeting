/*
 Welcome/Home page of application
*/
import { Link } from 'react-router';
import '../css/App.css';
import React from 'react';
import eslqlogo from '../image-assets/esl-q-logo.svg';

class Home extends React.Component {

    render() {
        return (
            <div className="Home">
            <body className="App-body">
                <img src={eslqlogo} className="App-logo" alt="logo" />
                <h1>Welcome to the ESL Question Targeter {this.props.isAuthed}</h1>
                <p>
                This application provides reading comprehension questions for English as a Second Language learners with a focus on cherry-picking better questions for you based on how different they are from your native lanugage (L1). 
                
                The theory is that if you get extra practice with questions that might be harder for you, it can help you get familiar with these differences and improve your learning experience.
                </p>
                <Link to="/about" className="link-text"><p>
                    Learn more about the research on the About page
                </p>
                </Link>
                <Link to="/quizform"><button className="myButton">
                    Click Here to Get Started!
                </button>
                </Link>
            </body>
            </div>
        );
    }
}

export default Home;
