import React, { useEffect } from 'react';
import { Card, message, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { CHALLENGE_MANY } from '../constants/queries';

import SingleChallenge from '../features/challenge/SingleChallenge';
import ChallengesList from '../features/challenge/ChallengesList';

const Challenges = () => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { loading, error, data } = useQuery(CHALLENGE_MANY);

  const current = data?.challengeMany.find(
    (challenge: Challenge) => challenge._id === challengeId
  );

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  return (
    <Spin spinning={loading}>
      <Card>
        {current || challengeId === 'new' ? (
          <SingleChallenge key={current?._id} current={current} />
        ) : (
          <ChallengesList challenges={data?.challengeMany} />
        )}
      </Card>
    </Spin>
  );
};

export default Challenges;
