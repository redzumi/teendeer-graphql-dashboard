import React from 'react';
import { Divider } from 'antd';
import LastNote from '../../features/notes/LastNote';

import NotesList from '../../features/notes/NotesList';
import Note from '../../features/notes/Note';

import './App.less';
import UserForm from '../../features/user/UserForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Notes with <code>GraphQL</code> queries.
        </p>
      </header>
      <div className="App-body">
        <UserForm />
        <Divider plain={true} />
        <Note />
        <Divider />
        <LastNote />
        <Divider />
        <NotesList />
      </div>
    </div>
  );
}

export default App;
