/*
 Quiz page: handles the actual question interation and answers
*/
import { Link } from 'react-router';
import '../css/Quiz.css';
import { Form } from 'react-bootstrap';
import React from 'react';
import { getNumQuestions, getPassage } from './API_interface'

function getRange(num) {
  return [...Array(num).keys()]
}

class QuizForm extends React.Component{

  constructor(props) {
    super(props)
    this.topics = this.props.topics;
    console.log('in form topics is')
    console.log(this.topics)

    this.paragraphs = [];
    this.questions = [];
    this.l1 = null;
    this.numParagraphs = 0;
    // this.randomizePara = false; // TODO
    this.numQuestions = 0;
  }

  handleTopicChange(event) {
    let value = event.target.value;
    this.topic = value
    console.log('topic is now ' + this.topic)
    this.paragraphs = getPassage(this.topic)
    console.log('set passage paragraphs to ' + this.paragraphs)
    console.log('test pra len ' + this.paragraphs.length)   
  }
  handleNumParaChange(event) {
    let value = event.target.value;
    this.numParagraphs = value
    console.log('num para is now ' + this.numParagraphs)
    this.numTotalQuestions = getNumQuestions(this.topic, this.numParagraphs)
  }
  handleL1Change(event) {
    let value = event.target.value;
    this.l1 = value
    console.log('L1 is now ' + this.l1)
  }
  handleNumQuesChange(event) {
    let value = event.target.value;
    this.numQuestions = value
    console.log('num ques is now ' + this.numQuestions)
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
              {this.topics.map(item => (
                <option
                  key={item}
                  value={item}>
                  {item}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="QuizFormElement" controlId="numParaRange">
            <Form.Label className="QuizFormLabel" >Number of paragraphs to read</Form.Label>
            <Form.Control
                  as="select"
                  name='numParagraphs' 
                  defaultValue='All'
                  onChange={this.handleNumParaChange.bind(this)}>
              {getRange(10).map(item => (
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
            <Form.Label className="QuizFormLabel" >Number of questions (max will scale with number of paragraphs)</Form.Label>
            <Form.Control
                  as="select"
                  name='numQuestions' 
                  defaultValue='All'
                  onChange={this.handleNumQuesChange.bind(this)}>
              {getRange(20).map(item => (
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
            this.props.handler(this.l1, this.topic,this.numParagraphs, this.numQuestions)}>
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
