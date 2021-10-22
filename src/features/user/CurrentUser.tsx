import { useQuery } from '@apollo/client';
import { Card, message, Spin } from 'antd';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';

const ME = gql`
  query {
    me {
      _id
      login
      firstName
      secondName
      notes {
        _id
        title
      }
    }
  }
`;

const CurrentUser = () => {
  const { loading, error, data } = useQuery(ME);

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  return (
    <Spin spinning={loading}>
      <Card title="me">{JSON.stringify(data?.me)}</Card>
    </Spin>
  );
};

export default CurrentUser;
