/*
 About page of application: talks about the research, implications, assumptions, and future work
*/
import React from 'react';

import '../css/App.css';
import '../css/About.css';

export default class About extends React.Component {

  render() {
    return (
      <div className="About">
        <body className="App-body">
          <h1>About</h1>
          <div className="about-text">
            <h3>What does L1 mean?</h3>
            <p>L1 is a language learner's native (first) language.</p>
            <h3>Why does L1 matter in ESL learning?</h3>
            <p>An estimated 42% of errors in ESL students are caused by L1 influence <a href="https://r-libre.teluq.ca/1394/1/pichette122%20as%20published.pdf">[cite]</a>. This shows that L1 is a major factor in the way that English learners approach ESL and offers an opportunity to target training in those predictable errors.</p>
            <h3>What do we mean by L1 targeting?</h3>
            <p>In order to select the most relevant questions for a specific L1, we order questions by a generated contrasive score and select the highest. The theory behind this work is that English content with more features that are different from a student's L1 will cause more difficulty for the student. This added difficulty presents the opportunity for the student to be exposed to these difficuly concepts early and often to increase understanding and reduce future errors.</p>
            <h3>How do we generate this contrastive score?</h3>
            <p>Using the <a href="https://cloud.google.com/translate/">Google Translate API</a> we translate both the question text and the surrounding context paragraph into the given L1. We then process both the English and L1 versions of the text using the respective language models from the Python Natural Language Processing library <a href="https://spacy.io/">spaCy</a> to extract the linguistic features of the text such as parts-of-speech, verb form, and semantic similarities. Finally, these features are used to generate a numeric representation of how different the English and L1 text versions are and this number is called the contrastive score.</p>
            <h3>Learn More:</h3>
            <p>See a video presentation of this project <a href="">HERE</a></p>
            <p>For a more detailed explanation of this work and the research behind it, see the project paper <a href="">HERE</a></p>
            <p>All of the source code for this UI and the backend API can be found on GitHub <a href="https://github.com/byramag/ESL-L1-question-targeting">HERE</a></p>
            <p>This project was created by <a href="https://www.linkedin.com/in/abigailbyram/">Abigail Byram</a> for Georgia Tech's graduate course CS6460: Educational Technology.</p>
          </div>
        </body>
      </div>
    );
  }
}
