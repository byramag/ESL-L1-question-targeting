/*
 Handles the shared functionalities between components
*/
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { getTopics } from './API_interface';
import '../css/App.css';

import Home from './Home'
import About from './About'
import QuizForm from './QuizForm'
import QuizContent from './Quiz'

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      l1: '',
      topics: getTopics(),
      selectedTopic: 'Oxygen',
      numParagraphs: 0,
      numQuestions: 0,
    }
    console.log('in app default state ' + this.state.l1 + ' ' + this.state.selectedTopic)
    this.quizFormHandler = this.quizFormHandler.bind(this)
  }

  quizFormHandler( l1, topic, numPara, numQues ) {
    // this.state.l1 = l1;
    // this.state.selectedTopic = topic
    // this.state.numParagraphs = numPara
    // this.state.numQuestions = numQues
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
          <p>the topics list is currently {this.state.topics}</p>
      </div>
    );
  }
}

export default App;
