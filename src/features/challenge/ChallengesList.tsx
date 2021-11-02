import { useQuery } from '@apollo/client';
import { Spin, Space, Card, message, Button } from 'antd';
import React, { useEffect, useState } from 'react';

import { CHALLENGE_MANY } from '../../constants/queries';
import SingleChallenge from './SingleChallenge';

const ChallengesList = () => {
  const [current, setCurrent] = useState<Challenge | undefined>();
  const { loading, error, data } = useQuery(CHALLENGE_MANY);

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  const handleClick = (challenge: Challenge) => () => {
    setCurrent(challenge);
  };

  const handleCreate = () => {
    setCurrent(undefined);
  };

  return (
    <Spin spinning={loading}>
      <SingleChallenge key={current?._id} current={current} />
      <Button onClick={handleCreate}>Create new</Button>
      <Space
        size={24}
        wrap={true}
        align="center"
        style={{ justifyContent: 'center ' }}>
        {data?.challengeMany?.map((challenge: Challenge) => (
          <Card
            key={challenge._id}
            title={challenge.name}
            onClick={handleClick(challenge)}>
            {challenge.description}
          </Card>
        ))}
      </Space>
    </Spin>
  );
};

export default ChallengesList;
