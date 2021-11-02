import { useQuery } from '@apollo/client';
import { Spin, Space, Card, message, Button } from 'antd';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { TASK_BY_CHALLENGE } from '../../constants/queries';
import StepsList from '../step/StepsList';
import SingleTask from './SingleTask';

const TasksList = () => {
  const history = useHistory();

  const params = useParams<{ taskId: string; challengeId: string }>();
  const { challengeId, taskId } = params;

  const { loading, error, data } = useQuery(TASK_BY_CHALLENGE, {
    variables: { challengeId },
  });

  const current = data?.tasksByChallenge.find(
    (task: Task) => task._id === taskId
  );

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  const handleClick = (task: Task) => () => {
    history.push(`/challenges/${challengeId}/${task._id}`);
  };

  const handleCreate = () => {
    history.push(`/challenges/${challengeId}/new`);
  };

  return (
    <Spin spinning={loading}>
      <Space size={24} wrap={true} style={{ justifyContent: 'center ' }}>
        {current || taskId === 'new' ? (
          <SingleTask key={current?._id} current={current} />
        ) : (
          <React.Fragment>
            {taskId && <Button onClick={handleCreate}>Create new</Button>}
            {data?.tasksByChallenge?.map((task: Task) => (
              <Card
                key={task._id}
                title={task.name}
                onClick={handleClick(task)}>
                {task.description}
              </Card>
            ))}
          </React.Fragment>
        )}
      </Space>
      <Card>
        <StepsList />
      </Card>
    </Spin>
  );
};

export default TasksList;
