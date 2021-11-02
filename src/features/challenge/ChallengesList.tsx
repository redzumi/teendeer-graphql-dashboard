import React from 'react';
import { Space, Card, Button } from 'antd';
import { useHistory } from 'react-router-dom';

type Props = {
  challenges: Challenge[];
  canCreate?: boolean;
};

const ChallengesList = ({ challenges, canCreate }: Props) => {
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
      wrap={true}
      align="center"
      style={{ justifyContent: 'center ' }}>
      {challenges?.map((challenge: Challenge) => (
        <Card
          key={challenge._id}
          title={challenge.name}
          onClick={handleClick(challenge)}>
          {challenge.description}
        </Card>
      ))}
      {canCreate && <Button onClick={handleCreate}>Create new</Button>}
    </Space>
  );
};

export default ChallengesList;
