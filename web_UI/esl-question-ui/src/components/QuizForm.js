/*
 Quiz page: handles the actual question interation and answers
*/
import { Link } from 'react-router';
import '../css/Quiz.css';
import { Form } from 'react-bootstrap';
import React from 'react';
import { getNumQuestions, getPassage } from './API_interface'
import axios from 'axios';

function getRange(num) {
  return [...Array(num).keys()]
}

class QuizForm extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      topics: this.props.topics,
      selectedTopic: undefined,
      l1: '',
      numParagraphs: 1,
      numQuestions: 1,
      maxPara: 1,
      maxQues: 1
    }
  }

  handleTopicChange(event) {
    let value = event.target.value;
    this.setState({ selectedTopic: value }, () => {
      console.log('topic is now ' + this.state.selectedTopic)
    });
    axios.post("https://esl-question-generator-qadjhsafva-ue.a.run.app/passage", 
    {
        "Title": value,
        "NumParagraphs": 0
    })
    .then(response => {
      this.setState({ maxPara: response.data.length });
      console.log(this.state.maxPara)
    });
  }
  handleNumParaChange(event) {
    let value = parseInt(event.target.value);
    this.setState({ numParagraphs: value}, () => {
      console.log('num para is now ' + this.state.numParagraphs)
    });
    axios.post("https://esl-question-generator-qadjhsafva-ue.a.run.app/questions", 
    {
        "Title": this.state.selectedTopic,
        "NumParagraphs": value,
        "NumQuestions": 0,
        "L1Target": "" // no L1 to speed up call
    })
    .then(response => {
      this.setState({ maxQues: response.data['Questions'].length });
      console.log(this.state.maxQues)
    });
  }
  handleL1Change(event) {
    let value = event.target.value;
    this.setState({ l1: value}, () => {
      console.log('L1 is now ' + this.state.l1)
    });
  }
  handleNumQuesChange(event) {
    let value = parseInt(event.target.value);
    this.setState({ numQuestions: value}, () => {
      console.log('num ques is now ' + this.state.numQuestions)
    });
  }

  render() {
    return (
      <div className="Quiz">
        <header>
          <h2>Fill in the information below to get started</h2>
        </header>
        <body className="QuizForm">
        <Form>
          <Form.Group className="QuizFormElement" controlId="l1Select">
            <Form.Label className="QuizFormLabel" >What is your native language?</Form.Label>
            <Form.Control
                  as="select" 
                  name='l1'
                  onChange={this.handleL1Change.bind(this)}>
              <option>None of these</option>
              <option>Chinese</option>
              <option>French</option>
              <option>Japanese</option>
              <option>Spanish</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="QuizFormElement" controlId="topicSelect">
            <Form.Label className="QuizFormLabel" >Select a topic to read about</Form.Label>
            <Form.Control
                as="select" 
                name='topic' 
                onChange={this.handleTopicChange.bind(this)}>
                  <option>Select a Topic</option>
                  {this.state.topics.map(item => (
                    <option
                      key={item}
                      value={item}>
                      {item.replace(/_/g, ' ')}
                    </option>
                  ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="QuizFormElement" controlId="numParaRange">
            <Form.Label className="QuizFormLabel" >Number of paragraphs to read (maximum depends on the topic you selected)</Form.Label>
            <Form.Control
                  as="select"
                  name='numParagraphs' 
                  defaultValue='All'
                  onChange={this.handleNumParaChange.bind(this)}>
              {getRange(this.state.maxPara).map(item => (
                <option
                  key={item+1}
                  value={item+1}>
                  {item+1}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>Randomize paragraphs? (this will give more variety of questions)</Form.Label>
            <Form.Check 
                type={"checkbox"}
                value={this.randomizePara}
              />
          </Form.Group> */}
          <Form.Group className="QuizFormElement" controlId="formBasicRange">
            <Form.Label className="QuizFormLabel" >Number of questions (maximum will scale with number of paragraphs)</Form.Label>
            <Form.Control
                  as="select"
                  name='numQuestions' 
                  defaultValue='All'
                  onChange={this.handleNumQuesChange.bind(this)}>
              {getRange(this.state.maxQues).map(item => (
                <option
                  key={item+1}
                  value={item+1}>
                  {item+1}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>Number of questions (max will scale with number of paragraphs)</Form.Label>
            <RangeSlider
              value={this.numQuestions}
              onChange={e => this.numQuestions=e.target.value}
              min={1}
              max={this.topics.length}
            />
          </Form.Group> */}
          <Link to="/quiz"><button className="myButton" onClick={() =>
            this.props.handler(this.state.l1, this.state.selectedTopic, 
              this.state.numParagraphs, this.state.numQuestions)}>
              Start Quiz
          </button>
          </Link>
        </Form>
        </body>
      </div>
    );
  }
}

export default QuizForm;
