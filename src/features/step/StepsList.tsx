import { useQuery } from '@apollo/client';
import { Spin, Space, Card, message, Button } from 'antd';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { STEP_BY_TASK } from '../../constants/queries';
import SingleStep from './SingleStep';

const StepsList = () => {
  const history = useHistory();

  const params =
    useParams<{ taskId: string; challengeId: string; stepId: string }>();
  const { challengeId, taskId, stepId } = params;

  const { loading, error, data } = useQuery(STEP_BY_TASK, {
    variables: { taskId },
  });

  const current = data?.stepsByTask.find((step: Step) => step._id === stepId);

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  const handleClick = (step: Step) => () => {
    history.push(`/challenges/${challengeId}/${taskId}/${step._id}`);
  };

  const handleCreate = () => {
    history.push(`/challenges/${challengeId}/${taskId}/new`);
  };

  return (
    <Spin spinning={loading}>
      <Space size={24} wrap={true} style={{ justifyContent: 'center ' }}>
        {current || stepId === 'new' ? (
          <SingleStep key={current?._id} current={current} />
        ) : (
          <React.Fragment>
            {challengeId && <Button onClick={handleCreate}>Create new</Button>}
            {data?.stepsByTask?.map((step: Step) => (
              <Card
                key={step._id}
                title={step.name}
                onClick={handleClick(step)}>
                {step.description}
              </Card>
            ))}
          </React.Fragment>
        )}
      </Space>
    </Spin>
  );
};

export default StepsList;
