/*
 Manages interactions with the Question API on GCP
*/
import React from 'react';

const baseURL = "https://esl-question-generator-qadjhsafva-ue.a.run.app";
// set return values in state

function getTopics(){
    return (
        [ "topic1", "topic2" ]
    );
}

function getPassage({ passage }){
    return (
        [ "para1", "para2" ]
    );
}

function getPassageByLen({ passage, len }){
    return (
        [ "para1", "para2" ]
    );
}

function requestQuestions(){
    return ("TODO")
}

export { getTopics, requestQuestions };