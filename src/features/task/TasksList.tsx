import { useQuery } from '@apollo/client';
import { Spin, Space, Card, message, Button } from 'antd';
import React, { useEffect, useState } from 'react';

import { TASK_MANY } from '../../constants/queries';
import SingleTask from './SingleTask';

const TasksList = () => {
  const [current, setCurrent] = useState<Task | undefined>();
  const { loading, error, data } = useQuery(TASK_MANY);

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  const handleClick = (task: Task) => () => {
    setCurrent(task);
  };

  const handleCreate = () => {
    setCurrent(undefined);
  };

  return (
    <Spin spinning={loading}>
      <SingleTask key={current?._id} current={current} />
      <Button onClick={handleCreate}>Create new</Button>
      <Space
        size={24}
        wrap={true}
        align="center"
        style={{ justifyContent: 'center ' }}>
        {data?.taskMany?.map((task: Task) => (
          <Card key={task._id} title={task.name} onClick={handleClick(task)}>
            {task.description}
          </Card>
        ))}
      </Space>
    </Spin>
  );
};

export default TasksList;
