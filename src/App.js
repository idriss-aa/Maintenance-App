import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Section from './Section';

function App() {
  return (
    <Router>
    <React.Fragment>
      <Section/>
    </React.Fragment>
  </Router>
  );
}

export default App;
