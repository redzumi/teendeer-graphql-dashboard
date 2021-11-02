import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.less';
import Routes from '../Routes/Routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <b style={{ color: '#520339' }}>Teendeer</b> dashboard with&nbsp;
          <code>GraphQL</code> queries.
        </p>
      </header>
      <div className="App-body">
        <Router>
          <Routes />
        </Router>
      </div>
    </div>
  );
}

export default App;
