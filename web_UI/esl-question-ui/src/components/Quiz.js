/*
 Quiz page: handles the actual question interation and answers
*/
import React from 'react';
import { Link } from 'react-router';
import { useLoading, Puff } from '@agney/react-loading';
import '../css/App.css';
import '../css/Quiz.css';
import Quiz from 'react-quiz-component';
import { getQuestions, getPassageByLen } from './API_interface'
import axios from 'axios';

function GetLoadAnimation() {
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Puff width="50" />,
    });

    return (
    <section {...containerProps}>
        {indicatorEl}
    </section>
    );
}

class QuizContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            passage: undefined,
            passageLoading: true,
            quiz: undefined,
            quizLoading: true,
            quizDone: false
        }
        this.resultObject = {}

        this.topic = props.topic;
        this.l1 = props.l1;
        this.numPara = props.numPara;
        this.numQues  = props.numQues;

    }

    componentDidMount() {
        axios.post("https://esl-question-generator-qadjhsafva-ue.a.run.app/passage",
        {
            "Title": this.topic,
            "NumParagraphs": parseInt(this.numPara)
        })
        .then(response => {
          this.setState({ passage: response.data });
          this.setState({ passageLoading: false });
          console.log(this.state.passage)
        });
        axios.post("https://esl-question-generator-qadjhsafva-ue.a.run.app/questions",
        {
            "Title": this.topic,
            "NumParagraphs": parseInt(this.numPara),
            "NumQuestions": parseInt(this.numQues),
            "L1Target": this.l1
        })
        .then(response => {
          this.setState({ quiz: this.formatAPIResponse(response.data) });
          this.setState({ quizLoading: false });
          console.log(this.state.quiz)
        });
      }

    getAnswers(questions) {
        let allAnswers = new Map()
        questions.forEach(function(q) {
            var answers = q['distractors']
            var i = Math.floor(Math.random() * questions.length); 
            answers.splice(i, 0, q['answer']) 
            allAnswers[q['question']] = [answers, (i+1).toString()]
        });
        return allAnswers
    }

    formatAPIResponse(response) {
        console.log(response)
        let answers = this.getAnswers(response['Questions'])
        console.log(answers)
        let questionObject = {
            "quizTitle": this.props.topic.replace(/_/g, ' '),
            "quizSynopsis": "These are the reading comprehension questions from the passage that were selected for you as they have features that might make them more difficult for native " + this.state.l1 + " speakers",
            "questions": []
        }
        response['Questions'].forEach(q => 
            questionObject['questions'].push({
                "question": q["question"],
                "questionType": "text",
                "answerSelectionType": "single",
                "answers": answers[q["question"]][0],
                "correctAnswer": answers[q["question"]][1],
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Answer can be found in paragraph: " + q["context"],
                "explanation": q["ranking_metadata"]["explanation"],
                "point": "1"
            })
        );
        return questionObject;
    }

    renderCustomResultPage(obj) {
        console.log('inside custom result func')
        console.log(obj.questions);
        const questionDivs = obj.questions.map((q, i) =>
            <div className="review">
                <h3>Question {i+1}: {q.question}</h3>
                <br/>
                <h4>Correct Answer:</h4>
                <p>{q.answers[parseInt(q.correctAnswer)-1]}</p>
                <br/>
                <h4>Where was this answer in context?</h4>
                <p>{q.messageForIncorrectAnswer}</p>
                <br/>
                <h4>Why was this chosen for you as a native {this.l1} speaker?</h4>
                <p>{q.explanation}</p>
            </div>
        );
        return <div>
            <h2>Question Review</h2>
            <h3>Corretly answered {obj.numberOfCorrectAnswers} out of {obj.numberOfQuestions} questions</h3>
            <div>{questionDivs}</div>
            <div>
                <Link to="/quizform"><button className="myButton">
                    Start another quiz
                </button>
                </Link>
                <Link to="/"><button className="myButton">
                    Go back to home
                </button>
                </Link>
            </div>
        </div>
    }

    render() {
        const quizCompleteAction = (obj) => {
            this.setState({quizDone: true});
            this.resultObject = obj;
            console.log('inside quiz complete action');
        }
        const renderPassage = (obj) => {
            if( ! this.state.passageLoading ) { 
                return (
                    <div className='readPassage'>
                        <h2>{this.topic.replace(/_/g, ' ')}</h2>
                        {this.state.passage.map(para => (
                            <p>{para}</p>
                        ))}
                    </div>)
            } else {
            return <div><p>Passage loading...</p><GetLoadAnimation /></div>
            }
        }
        const renderQuiz = (obj) => {
            if( ! this.state.quizLoading ) { 
                return (
                    <div>
                        <Quiz className='quiz' 
                            quiz={this.state.quiz} 
                            showInstantFeedback={true}
                            continueTillCorrect={true}
                            showDefaultResult={false}
                            onComplete={quizCompleteAction}
                        />
                    </div>)
            } else {
                return <div><p>Quiz loading... If the passage is long, this may take a while. Go ahead and start reading!</p><GetLoadAnimation /></div>
            }
        }
        return (
            <div className="Quiz">
            <header>
                <h2>Read the passage below, then scroll down to begin answering questions</h2>
            </header>
            <body className="Quiz-body">
                { renderPassage() }
                { renderQuiz() }
                {this.state.quizDone ? this.renderCustomResultPage(this.resultObject) : ""}
            </body>
            </div>
        );
    }
}

export default QuizContent;
