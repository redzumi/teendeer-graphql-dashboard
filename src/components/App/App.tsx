import React from 'react';

import './App.less';
import Routes from '../Routes/Routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Notes with <code>GraphQL</code> queries.
        </p>
      </header>
      <div className="App-body">
        <Routes />
      </div>
    </div>
  );
}

export default App;
