import React from 'react';
import NotesList from '../../features/notes/NotesList';
import Note from '../../features/notes/Note';

import './App.less';
import { Divider } from 'antd';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Notes with <code>GraphQL</code> queries.
        </p>
      </header>
      <div className="App-body">
        <NotesList />
        <Divider />
        <Note />
      </div>
    </div>
  );
}

export default App;
