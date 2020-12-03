/*
 Handles the shared functionalities between components
*/
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { getTopics } from './API_interface';
import '../css/App.css';
import axios from 'axios';

import Home from './Home'
import About from './About'
import QuizForm from './QuizForm'
import QuizContent from './Quiz'

class App extends React.Component {

  constructor() {
    super()

    const loadStatusUpdate = () => {
      this.setState({topicsLoading: false})
    }
    this.state = {
      l1: '',
      topics: undefined,
      selectedTopic: 'Oxygen',
      numParagraphs: 0,
      numQuestions: 0,
      topicsLoading: true,
    }
    console.log('in app default state ' + this.state.l1 + ' ' + this.state.selectedTopic)
    this.quizFormHandler = this.quizFormHandler.bind(this)
    console.log(this.state.topics)
  }

  componentDidMount() {
    axios.get("https://esl-question-generator-qadjhsafva-ue.a.run.app/passages").then(response => {
      this.setState({ topics: response.data });
      this.setState({ topicsLoading: false });
      console.log(this.state.topics)
    });
  }

  quizFormHandler( l1, topic, numPara, numQues ) {
    this.setState({l1: l1})
    if(topic){
      this.setState({selectedTopic: topic})
    }
    this.setState({numParagraphs: numPara})
    this.setState({numQuestions: numQues}, () => {
      console.log('in app got state ' + this.state.l1 + ' ' + this.state.selectedTopic);})
  }
  getRequestObj() {
    return {
      "Title": this.state.topic,
      "NumParagraphs": this.state.numParagraphs,
      "NumQuestions": this.state.numQuestions,
      "L1Target": this.state.l1
    }
  }

  render() {
    if(this.state.topicsLoading){
      return null
    }
    return (
      <div className="App">
        <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
          <Route path="/" component={() => <Home />} />
          <Route path="/about" component={() => <About /> } />
          <Route path="/quizform" component={() =>  
            <QuizForm topics={this.state.topics} handler={this.quizFormHandler}/> } />
          <Route path="/quiz" component={() =>  
            <QuizContent l1={this.state.l1} topic={this.state.selectedTopic} numPara={this.state.numParagraphs} numQues={this.state.numQuestions}/> } />
        </Router>
      </div>
    );
  }
}

export default App;
