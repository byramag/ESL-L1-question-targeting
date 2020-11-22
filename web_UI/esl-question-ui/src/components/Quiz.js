/*
 Quiz page: handles the actual question interation and answers
*/
import { Link } from 'react-router';
import '../css/Quiz.css';
import { getTopics, requestQuestions } from './API_interface';
import { Form } from 'react-bootstrap';
import { React, useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';


function Quiz() {

  const [ l1, setL1 ] = useState('null');
  const [ topics, setTopics ] = useState(getTopics());
  const [ randomizePara, setIsRand ] = useState(true);
  const [ numParagraphs, setNumPara ] = useState(1);
  const [ numQuestions, setNumQues ] = useState(1);

  return (
    <div className="Quiz">
      <header>
        <h2>Read the passage below, then scroll down to begin answering questions</h2>
      </header>
      <body className="Quiz-body">
          <h3>topic name</h3>
          <p>passage text, put this in a box for easier reading</p>
          <Form>
          {questions.map(q => (
              <Form.Group controlId="l1Select">
                <Form.Label>{q.question}</Form.Label>
                <Form.Control as="textarea" rows={1} />
              <Form.Group/>
          ))}
          <Form/>
      </body>
    </div>
  );
}

export default Quiz;
