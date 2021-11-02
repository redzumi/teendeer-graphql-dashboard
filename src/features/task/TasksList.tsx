import { useQuery } from '@apollo/client';
import { Spin, Card, message, Button, List } from 'antd';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { TASK_BY_CHALLENGE } from '../../constants/queries';
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
      <Card>
        {current || taskId === 'new' ? (
          <SingleTask key={current?._id} current={current} />
        ) : (
          <List
            dataSource={data?.tasksByChallenge ? data?.tasksByChallenge : []}
            bordered={false}
            loading={loading}
            itemLayout="horizontal"
            header={
              challengeId && (
                <Button type="primary" onClick={handleCreate}>
                  Create new
                </Button>
              )
            }
            renderItem={(item: Task) => (
              <List.Item key={item._id} onClick={handleClick(item)}>
                <Card
                  key={item._id}
                  title={item.name}
                  style={{ width: '100%' }}
                  size="small"
                  onClick={handleClick(item)}>
                  {item.description}
                </Card>
              </List.Item>
            )}
          />
        )}
      </Card>
    </Spin>
  );
};

export default TasksList;
