import React from 'react';
import { Divider } from 'antd';

import CurrentUser from '../../features/user/CurrentUser';
import TalentsList from '../../features/talents/TalentsList';
import ChallengesList from '../../features/challenge/ChallengesList';

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
        <Divider plain={true} />
        <TalentsList />
        <Divider plain={true} />
        <ChallengesList />
      </div>
    </div>
  );
}

export default App;
