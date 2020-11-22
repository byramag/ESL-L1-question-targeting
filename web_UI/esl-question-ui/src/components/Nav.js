/*
 Navigation bar used in every component
*/
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import '../css/Nav.css'
import eslqlogo from '../image-assets/esl-q-logo.svg';


function SiteNavbar(){
    return(
        <div>
            <Navbar className="Navbar" expand="lg" fixed="top">
                <Navbar.Brand>
                    <a href="/test">
                        <img src={eslqlogo} className="logo" />
                    </a>
                </Navbar.Brand>
                <Nav.Link className="Nav-block" href="/">Home</Nav.Link>
                <Nav.Link className="Nav-block" href="/about">About</Nav.Link>
                <Nav.Link className="Nav-block" href="/quizform">Get Questions</Nav.Link>
            </Navbar>
        </div>
    );
}

export default SiteNavbar;