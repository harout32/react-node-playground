import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRoutes } from './routers'

class App extends Component {
  render() {
    return (
      <Router>
          <MainRoutes />
      </Router>
    );
  }
}

export default App;
