/*
 Quiz page: handles the actual question interation and answers
*/
import React from 'react';
import { Link } from 'react-router';
import '../css/App.css';
import '../css/Quiz.css';
import Quiz from 'react-quiz-component';
import { getQuestions, getPassageByLen } from './API_interface'

class QuizContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {quizDone: false}
        this.resultObject = {}

        this.passage = getPassageByLen(props.topic, props.numPara)
        this.quiz = getQuestions(props.l1, props.topic, props.numPara, props.numQues)
        console.log('completed constructor successfully')
        console.log('quiz is')
        console.log(this.quiz)

        this.topic = props.topic;
        this.l1 = props.l1;
        console.log(this.l1)

    }

    formatAPIResponse(response) {
        var questionObject = {
            "quizTitle": this.props.topic,
            "quizSynopsis": "Lorem ipsum",
            "questions": []
        }
        response['Questions'].forEach(q => 
            questionObject['questions'].push({
                "question": q["question"],
                "questionType": "text",
                "answerSelectionType": "single",
                "answers": [
                    q["answer"],
                    "dummyValue",
                    "dummyValue",
                    "dummyValue"
                ],
                "correctAnswer": "1",
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
                "explanation": "Answer can be found in paragraph: " + q["context"],
                "point": "1"
            })
        );
        console.log(questionObject)
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
                <p>{q.answers[parseInt(q.correctAnswer)]}</p>
                <br/>
                <h4>Where was this answer in context?</h4>
                <p>{q.answers[parseInt(q.correctAnswer)]}</p>
                <br/>
                <h4>Why was this chosen for you as a native speaker?</h4>
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
        return (
            <div className="Quiz">
            <header>
                <h2>Read the passage below, then scroll down to begin answering questions</h2>
            </header>
            <body className="Quiz-body">
                <div className='readPassage'>
                    <h2>{this.topic}</h2>
                    {this.passage.map(para => (
                        <p>{para}</p>
                    ))}
                </div>
                <div>
                    <Quiz className='quiz' 
                        quiz={this.formatAPIResponse(this.quiz)} 
                        showInstantFeedback={true}
                        continueTillCorrect={true}
                        showDefaultResult={false}
                        onComplete={quizCompleteAction}
                    />
                </div>
                {this.state.quizDone ? this.renderCustomResultPage(this.resultObject) : ""}
            </body>
            </div>
        );
    }
}

export default QuizContent;
