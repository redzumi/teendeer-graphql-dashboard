import React from 'react';
import { Divider } from 'antd';

import UserForm from '../../features/user/UserForm';
import CurrentUser from '../../features/user/CurrentUser';
import LastNote from '../../features/notes/LastNote';
import NotesList from '../../features/notes/NotesList';
import Note from '../../features/notes/Note';

import './App.less';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Notes with <code>GraphQL</code> queries.
        </p>
      </header>
      <div className="App-body">
        <CurrentUser />
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
