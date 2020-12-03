(this["webpackJsonpesl-question-ui"]=this["webpackJsonpesl-question-ui"]||[]).push([[0],{108:function(e,t,s){},109:function(e,t,s){"use strict";s.r(t);var a=s(1),n=s(0),i=s.n(n),r=s(22),o=s.n(r),c=(s(68),s(11)),l=s(12),u=s(28),h=s(14),d=s(13),j=s(9),p=s(19),b=s.n(p),m=(s(26),s.p+"static/media/esl-q-logo.2daf62c2.svg"),g=function(e){Object(h.a)(s,e);var t=Object(d.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(a.jsx)("body",{className:"App-body",children:Object(a.jsxs)("div",{className:"Home",children:[Object(a.jsx)("img",{src:m,className:"App-logo",alt:"logo"}),Object(a.jsxs)("h1",{children:["Welcome to the ESL Question Targeter ",this.props.isAuthed]}),Object(a.jsx)("p",{children:"This application provides reading comprehension questions for English as a Second Language learners with a focus on cherry-picking better questions for you based on how different they are from your native lanugage (L1). The theory is that if you get extra practice with questions that might be harder for you, it can help you get familiar with these differences and improve your learning experience."}),Object(a.jsx)(j.a,{to:"/about",className:"link-text",children:Object(a.jsx)("p",{children:"Learn more about the research on the About page"})}),Object(a.jsx)(j.a,{to:"/quizform",children:Object(a.jsx)("button",{className:"myButton",children:"Click Here to Get Started!"})})]})})}}]),s}(i.a.Component),f=(s(97),function(e){Object(h.a)(s,e);var t=Object(d.a)(s);function s(){return Object(c.a)(this,s),t.apply(this,arguments)}return Object(l.a)(s,[{key:"render",value:function(){return Object(a.jsx)("div",{className:"About",children:Object(a.jsxs)("body",{className:"App-body",children:[Object(a.jsx)("h1",{children:"About"}),Object(a.jsxs)("div",{className:"about-text",children:[Object(a.jsx)("h3",{children:"What does L1 mean?"}),Object(a.jsx)("p",{children:"L1 is a language learner's native (first) language."}),Object(a.jsx)("h3",{children:"Why does L1 matter in ESL learning?"}),Object(a.jsxs)("p",{children:["An estimated 42% of errors in ESL students are caused by L1 influence ",Object(a.jsx)("a",{href:"https://r-libre.teluq.ca/1394/1/pichette122%20as%20published.pdf",children:"[cite]"}),". This shows that L1 is a major factor in the way that English learners approach ESL and offers an opportunity to target training in those predictable errors."]}),Object(a.jsx)("h3",{children:"What do we mean by L1 targeting?"}),Object(a.jsx)("p",{children:"In order to select the most relevant questions for a specific L1, we order questions by a generated contrasive score and select the highest. The theory behind this work is that English content with more features that are different from a student's L1 will cause more difficulty for the student. This added difficulty presents the opportunity for the student to be exposed to these difficuly concepts early and often to increase understanding and reduce future errors."}),Object(a.jsx)("h3",{children:"How do we generate this contrastive score?"}),Object(a.jsxs)("p",{children:["Using the ",Object(a.jsx)("a",{href:"https://cloud.google.com/translate/",children:"Google Translate API"})," we translate both the question text and the surrounding context paragraph into the given L1. We then process both the English and L1 versions of the text using the respective language models from the Python Natural Language Processing library ",Object(a.jsx)("a",{href:"https://spacy.io/",children:"spaCy"})," to extract the linguistic features of the text such as parts-of-speech, verb form, and semantic similarities. Finally, these features are used to generate a numeric representation of how different the English and L1 text versions are and this number is called the contrastive score."]}),Object(a.jsx)("h3",{children:"Learn More:"}),Object(a.jsxs)("p",{children:["See a video presentation of this project ",Object(a.jsx)("a",{href:"",children:"HERE"})]}),Object(a.jsxs)("p",{children:["For a more detailed explanation of this work and the research behind it, see the project paper ",Object(a.jsx)("a",{href:"",children:"HERE"})]}),Object(a.jsxs)("p",{children:["All of the source code for this UI and the backend API can be found on GitHub ",Object(a.jsx)("a",{href:"https://github.com/byramag/ESL-L1-question-targeting",children:"HERE"})]}),Object(a.jsxs)("p",{children:["This project was created by ",Object(a.jsx)("a",{href:"https://www.linkedin.com/in/abigailbyram/",children:"Abigail Byram"})," for Georgia Tech's graduate course CS6460: Educational Technology."]})]})]})})}}]),s}(i.a.Component)),x=s(61),O=s(113);s(51);function v(e){return Object(x.a)(Array(e).keys())}var y=function(e){Object(h.a)(s,e);var t=Object(d.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).state={topics:a.props.topics,selectedTopic:void 0,l1:"",numParagraphs:1,numQuestions:1,maxPara:1,maxQues:1},a}return Object(l.a)(s,[{key:"handleTopicChange",value:function(e){var t=this,s=e.target.value;this.setState({selectedTopic:s},(function(){console.log("topic is now "+t.state.selectedTopic)})),b.a.post("https://esl-question-generator-qadjhsafva-ue.a.run.app/passage",{Title:s,NumParagraphs:0}).then((function(e){t.setState({maxPara:e.data.length}),console.log(t.state.maxPara)}))}},{key:"handleNumParaChange",value:function(e){var t=this,s=parseInt(e.target.value);this.setState({numParagraphs:s},(function(){console.log("num para is now "+t.state.numParagraphs)})),b.a.post("https://esl-question-generator-qadjhsafva-ue.a.run.app/questions",{Title:this.state.selectedTopic,NumParagraphs:s,NumQuestions:0,L1Target:""}).then((function(e){t.setState({maxQues:e.data.Questions.length}),console.log(t.state.maxQues)}))}},{key:"handleL1Change",value:function(e){var t=this,s=e.target.value;this.setState({l1:s},(function(){console.log("L1 is now "+t.state.l1)}))}},{key:"handleNumQuesChange",value:function(e){var t=this,s=parseInt(e.target.value);this.setState({numQuestions:s},(function(){console.log("num ques is now "+t.state.numQuestions)}))}},{key:"render",value:function(){var e=this;return Object(a.jsxs)("div",{className:"Quiz",children:[Object(a.jsx)("header",{children:Object(a.jsx)("h2",{children:"Fill in the information below to get started"})}),Object(a.jsx)("body",{className:"QuizForm",children:Object(a.jsxs)(O.a,{children:[Object(a.jsxs)(O.a.Group,{className:"QuizFormElement",controlId:"l1Select",children:[Object(a.jsx)(O.a.Label,{className:"QuizFormLabel",children:"What is your native language?"}),Object(a.jsxs)(O.a.Control,{as:"select",name:"l1",onChange:this.handleL1Change.bind(this),children:[Object(a.jsx)("option",{children:"None of these"}),Object(a.jsx)("option",{children:"Chinese"}),Object(a.jsx)("option",{children:"French"}),Object(a.jsx)("option",{children:"Japanese"}),Object(a.jsx)("option",{children:"Spanish"})]})]}),Object(a.jsxs)(O.a.Group,{className:"QuizFormElement",controlId:"topicSelect",children:[Object(a.jsx)(O.a.Label,{className:"QuizFormLabel",children:"Select a topic to read about"}),Object(a.jsxs)(O.a.Control,{as:"select",name:"topic",onChange:this.handleTopicChange.bind(this),children:[Object(a.jsx)("option",{children:"Select a Topic"}),this.state.topics.map((function(e){return Object(a.jsx)("option",{value:e,children:e.replace(/_/g," ")},e)}))]})]}),Object(a.jsxs)(O.a.Group,{className:"QuizFormElement",controlId:"numParaRange",children:[Object(a.jsx)(O.a.Label,{className:"QuizFormLabel",children:"Number of paragraphs to read (maximum depends on the topic you selected)"}),Object(a.jsx)(O.a.Control,{as:"select",name:"numParagraphs",defaultValue:"All",onChange:this.handleNumParaChange.bind(this),children:v(this.state.maxPara).map((function(e){return Object(a.jsx)("option",{value:e+1,children:e+1},e+1)}))})]}),Object(a.jsxs)(O.a.Group,{className:"QuizFormElement",controlId:"formBasicRange",children:[Object(a.jsx)(O.a.Label,{className:"QuizFormLabel",children:"Number of questions (maximum will scale with number of paragraphs)"}),Object(a.jsx)(O.a.Control,{as:"select",name:"numQuestions",defaultValue:"All",onChange:this.handleNumQuesChange.bind(this),children:v(this.state.maxQues).map((function(e){return Object(a.jsx)("option",{value:e+1,children:e+1},e+1)}))})]}),Object(a.jsx)(j.a,{to:"/quiz",children:Object(a.jsx)("button",{className:"myButton",onClick:function(){return e.props.handler(e.state.l1,e.state.selectedTopic,e.state.numParagraphs,e.state.numQuestions)},children:"Start Quiz"})})]})})]})}}]),s}(i.a.Component),q=s(40),w=s(41),N=s(58),L=s.n(N);function Q(){var e=Object(w.b)({loading:!0,indicator:Object(a.jsx)(w.a,{width:"50"})}),t=e.containerProps,s=e.indicatorEl;return Object(a.jsx)("section",Object(q.a)(Object(q.a)({},t),{},{children:s}))}var z=function(e){Object(h.a)(s,e);var t=Object(d.a)(s);function s(e){var a;return Object(c.a)(this,s),(a=t.call(this,e)).state={passage:void 0,passageLoading:!0,quiz:void 0,quizLoading:!0,quizDone:!1},a.resultObject={},a.topic=e.topic,a.l1=e.l1,a.numPara=e.numPara,a.numQues=e.numQues,a}return Object(l.a)(s,[{key:"componentDidMount",value:function(){var e=this;b.a.post("https://esl-question-generator-qadjhsafva-ue.a.run.app/passage",{Title:this.topic,NumParagraphs:parseInt(this.numPara)}).then((function(t){e.setState({passage:t.data}),e.setState({passageLoading:!1}),console.log(e.state.passage)})),b.a.post("https://esl-question-generator-qadjhsafva-ue.a.run.app/questions",{Title:this.topic,NumParagraphs:parseInt(this.numPara),NumQuestions:parseInt(this.numQues),L1Target:this.l1}).then((function(t){e.setState({quiz:e.formatAPIResponse(t.data)}),e.setState({quizLoading:!1}),console.log(e.state.quiz)}))}},{key:"getAnswers",value:function(e){var t=new Map;return e.forEach((function(e){var s=e.distractors,a=Math.floor(Math.random()*s.length);s.splice(a,0,e.answer),t[e.question]=[s,(a+1).toString()]})),t}},{key:"formatAPIResponse",value:function(e){console.log(e);var t=this.getAnswers(e.Questions);console.log(t);var s=this.l1?"These selected questions have features that might make them more difficult for native "+this.l1+" speakers, so they'll give you extra practice.":"This is the default ordering of reading comprehension questions not targeted toward any particular native language",a={quizTitle:this.props.topic.replace(/_/g," "),quizSynopsis:s,questions:[]};return e.Questions.forEach((function(e){return a.questions.push({question:e.question,questionType:"text",answerSelectionType:"single",answers:t[e.question][0],correctAnswer:t[e.question][1],messageForCorrectAnswer:"Correct answer. Good job.",messageForIncorrectAnswer:"Answer can be found in paragraph: "+e.context,explanation:e.ranking_metadata.explanation,point:"1"})})),a}},{key:"renderCustomResultPage",value:function(e){var t=this;console.log("inside custom result func"),console.log(e.questions);var s=e.questions.map((function(e,s){return Object(a.jsxs)("div",{className:"review",children:[Object(a.jsxs)("h3",{children:["Question ",s+1,": ",e.question]}),Object(a.jsx)("br",{}),Object(a.jsx)("h4",{children:"Correct Answer:"}),Object(a.jsx)("p",{children:e.answers[parseInt(e.correctAnswer)-1]}),Object(a.jsx)("br",{}),Object(a.jsx)("h4",{children:"Where was this answer in context?"}),Object(a.jsx)("p",{children:e.messageForIncorrectAnswer}),Object(a.jsx)("br",{}),Object(a.jsxs)("h4",{children:["Why was this chosen for you as a native ",t.l1," speaker?"]}),Object(a.jsx)("p",{children:e.explanation})]})}));return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Question Review"}),Object(a.jsxs)("h3",{children:["Corretly answered ",e.numberOfCorrectAnswers," out of ",e.numberOfQuestions," questions"]}),Object(a.jsx)("div",{children:s}),Object(a.jsxs)("div",{children:[Object(a.jsx)(j.a,{to:"/quizform",children:Object(a.jsx)("button",{className:"myButton",children:"Start another quiz"})}),Object(a.jsx)(j.a,{to:"/",children:Object(a.jsx)("button",{className:"myButton",children:"Go back to home"})})]})]})}},{key:"render",value:function(){var e=this,t=function(t){e.setState({quizDone:!0}),e.resultObject=t,console.log("inside quiz complete action")};return Object(a.jsxs)("div",{className:"Quiz",children:[Object(a.jsx)("header",{children:Object(a.jsx)("h2",{children:"Read the passage below, then scroll down to begin answering questions"})}),Object(a.jsxs)("body",{className:"Quiz-body",children:[e.state.passageLoading?Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{children:"Passage loading..."}),Object(a.jsx)(Q,{})]}):Object(a.jsxs)("div",{className:"readPassage",children:[Object(a.jsx)("h2",{children:e.topic.replace(/_/g," ")}),e.state.passage.map((function(e){return Object(a.jsx)("p",{children:e})}))]}),e.state.quizLoading?Object(a.jsxs)("div",{children:[Object(a.jsx)("p",{children:"Quiz loading... If the passage is long, this may take a while. Go ahead and start reading!"}),Object(a.jsx)(Q,{})]}):Object(a.jsx)("div",{children:Object(a.jsx)(L.a,{className:"quiz",quiz:e.state.quiz,continueTillCorrect:!0,showDefaultResult:!1,onComplete:t})}),this.state.quizDone?this.renderCustomResultPage(this.resultObject):""]})]})}}]),s}(i.a.Component),T=function(e){Object(h.a)(s,e);var t=Object(d.a)(s);function s(){var e;Object(c.a)(this,s);return(e=t.call(this)).state={l1:"",topics:void 0,selectedTopic:"Oxygen",numParagraphs:0,numQuestions:0,topicsLoading:!0},console.log("in app default state "+e.state.l1+" "+e.state.selectedTopic),e.quizFormHandler=e.quizFormHandler.bind(Object(u.a)(e)),console.log(e.state.topics),e}return Object(l.a)(s,[{key:"componentDidMount",value:function(){var e=this;b.a.get("https://esl-question-generator-qadjhsafva-ue.a.run.app/passages").then((function(t){e.setState({topics:t.data}),e.setState({topicsLoading:!1}),console.log(e.state.topics)}))}},{key:"quizFormHandler",value:function(e,t,s,a){var n=this;this.setState({l1:e}),t&&this.setState({selectedTopic:t}),this.setState({numParagraphs:s}),this.setState({numQuestions:a},(function(){console.log("in app got state "+n.state.l1+" "+n.state.selectedTopic)}))}},{key:"getRequestObj",value:function(){return{Title:this.state.topic,NumParagraphs:this.state.numParagraphs,NumQuestions:this.state.numQuestions,L1Target:this.state.l1}}},{key:"render",value:function(){var e=this;return this.state.topicsLoading?null:Object(a.jsx)("div",{className:"App",children:Object(a.jsxs)(j.c,{history:j.d,onUpdate:function(){return window.scrollTo(0,0)},children:[Object(a.jsx)(j.b,{path:"/",component:function(){return Object(a.jsx)(g,{})}}),Object(a.jsx)(j.b,{path:"/about",component:function(){return Object(a.jsx)(f,{})}}),Object(a.jsx)(j.b,{path:"/quizform",component:function(){return Object(a.jsx)(y,{topics:e.state.topics,handler:e.quizFormHandler})}}),Object(a.jsx)(j.b,{path:"/quiz",component:function(){return Object(a.jsx)(z,{l1:e.state.l1,topic:e.state.selectedTopic,numPara:e.state.numParagraphs,numQues:e.state.numQuestions})}})]})})}}]),s}(i.a.Component),k=s(112),P=s(114);s(108);var C=function(){return Object(a.jsx)("div",{children:Object(a.jsxs)(k.a,{className:"Navbar",expand:"lg",fixed:"top",children:[Object(a.jsx)(k.a.Brand,{children:Object(a.jsx)("a",{href:"/test",children:Object(a.jsx)("img",{src:m,className:"logo"})})}),Object(a.jsx)(P.a.Link,{className:"Nav-block",href:"/",children:"Home"}),Object(a.jsx)(P.a.Link,{className:"Nav-block",href:"/about",children:"About"}),Object(a.jsx)(P.a.Link,{className:"Nav-block",href:"/quizform",children:"Get Questions"})]})})},S=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,115)).then((function(t){var s=t.getCLS,a=t.getFID,n=t.getFCP,i=t.getLCP,r=t.getTTFB;s(e),a(e),n(e),i(e),r(e)}))};o.a.render(Object(a.jsxs)(i.a.StrictMode,{children:[Object(a.jsx)(C,{}),Object(a.jsx)(T,{})]}),document.getElementById("root")),S()},26:function(e,t,s){},51:function(e,t,s){},68:function(e,t,s){},97:function(e,t,s){}},[[109,1,2]]]);
//# sourceMappingURL=main.2d572dcc.chunk.js.map