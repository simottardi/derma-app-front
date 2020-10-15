import React from 'react';
import './App.css';
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import styled from "styled-components";
/* import { BrowserRouter as Router, Route } from "react-router-dom"; */

export default function App() {

  const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

  return (
 <div className="App">
      <Navbar />
         <Button > login patient </Button>
         <Button > login doctor </Button>
         <Button > patient signup </Button>
      <Footer />
 </div>
  );
}



