/*
 Quiz page: handles the actual question interation and answers
*/
import { Link } from 'react-router';
import '../css/Quiz.css';
import { getTopics, requestQuestions } from './API_interface';
import { Form } from 'react-bootstrap';
import { React, useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';


function QuizForm() {

  const [ l1, setL1 ] = useState('null');
  const [ topics, setTopics ] = useState(getTopics());
  const [ randomizePara, setIsRand ] = useState(true);
  const [ numParagraphs, setNumPara ] = useState(1);
  const [ numQuestions, setNumQues ] = useState(1);

  return (
    <div className="Quiz">
      <header>
        <h2>Fill in the information below to get started</h2>
      </header>
      <body className="Quiz-body">
      <Form>
        <Form.Group controlId="l1Select">
          <Form.Label>What is your native language?</Form.Label>
          <Form.Control as="select">
            <option>None of these</option>
            <option>Chinese (Mandarin)</option>
            <option>French</option>
            <option>Japanese</option>
            <option>Spanish</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="topicSelect">
          <Form.Label>Select a topic to read about</Form.Label>
          <Form.Control as="select">
            {topics.map(item => (
              <option
                key={item}
                value={item}>
                {item}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="numParaRange">
          <Form.Label>Number of paragraphs to read (max will be different per topic)</Form.Label>
          <RangeSlider
            value={numParagraphs}
            onChange={e => setNumPara(e.target.value)}
            min={1}
            max={topics.length}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Randomize paragraphs? (this will give more variety of questions)</Form.Label>
          <Form.Check 
              type={"checkbox"}
              value={randomizePara}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Number of questions (max will scale with number of paragraphs)</Form.Label>
          <RangeSlider
            value={numQuestions}
            onChange={e => setNumQues(e.target.value)}
            min={1}
            max={topics.length}
          />
        </Form.Group>
        <Link to="/quiz"><button className="myButton">
            Start Quiz
        </button>
        </Link>
      </Form>
      </body>
    </div>
  );
}

export default QuizForm;
