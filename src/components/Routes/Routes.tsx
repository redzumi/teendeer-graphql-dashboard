import { Steps, Tabs } from 'antd';
import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Challenges from '../../pages/Challenges';
import Talents from '../../pages/Talents';
import Tasks from '../../pages/Tasks';
import User from '../../pages/User';

const { TabPane } = Tabs;

const TABS = [
  { name: 'Me', path: '/me' },
  { name: 'Talents', path: '/talents' },
  { name: 'Challenges', path: '/challenges' },
  { name: 'Tasks', path: '/tasks' },
  { name: 'Steps', path: '/steps' },
];

const Routes = () => {
  const history = useHistory();

  const handleTabChange = (key: string) => {
    history.push(key);
  };

  return (
    <React.Fragment>
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        {TABS.map((tab) => (
          <TabPane tab={tab.name} key={tab.path}></TabPane>
        ))}
      </Tabs>
      <Switch>
        <Route path="/me">
          <User />
        </Route>
        <Route path={['/talents/:talentId', '/talents']}>
          <Talents />
        </Route>
        <Route
          path={[
            '/challenges/:challengeId/:taskId',
            '/challenges/:challengeId',
            '/challenges',
          ]}>
          <Challenges />
        </Route>
        <Route path={['/tasks/:taskId/:stepId', '/tasks']}>
          <Tasks />
        </Route>
        <Route path={['/steps/:stepId', '/steps']}>
          <Steps />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
