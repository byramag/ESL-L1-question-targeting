/*
 Welcome/Home page of application
*/
import { Link } from 'react-router';
import '../css/App.css';
import { browserHistory } from 'react-router';
import eslqlogo from '../image-assets/esl-q-logo.svg';
import { useHistory } from "react-router-dom";

function GetStartedButton() {
    const history = useHistory();
  
    function handleClick() {
        history.push("/about");
    }
  
    return (
      <button className="myButton" type="button" onClick={handleClick}>
        Click Here to Get Started!
      </button>
    );
  }

function Home() {
    const getStarted = () => {
        <Link to ='/href' ></Link>;
    }
    const aboutLink = <a href='/about'>About page</a>;
    return (
        <div className="Home">
        <body className="App-body">
            <img src={eslqlogo} className="App-logo" alt="logo" />
            <h1>Welcome to the ESL Question Targeter</h1>
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

export default Home;
