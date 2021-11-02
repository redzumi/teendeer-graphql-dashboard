import React from 'react';
import { Space, Card, Button } from 'antd';
import { useHistory } from 'react-router-dom';

type Props = {
  challenges: Challenge[];
};

const ChallengesList = ({ challenges }: Props) => {
  const history = useHistory();

  const handleClick = (challenge: Challenge) => () => {
    history.push(`/challenges/${challenge._id}`);
  };

  const handleCreate = () => {
    history.push(`/challenges/new`);
  };

  return (
    <Space
      size={24}
      align="center"
      direction="vertical"
      style={{ justifyContent: 'center ' }}>
      <Button type="primary" onClick={handleCreate}>
        Create new challenge
      </Button>
      <Space>
        {challenges?.map((challenge: Challenge) => (
          <Card
            key={challenge._id}
            title={challenge.name}
            onClick={handleClick(challenge)}>
            {challenge.description}
          </Card>
        ))}
      </Space>
    </Space>
  );
};

export default ChallengesList;
