import React from 'react';
import { gql, useSubscription } from '@apollo/client';
import { Card } from 'antd';

const NOTES_SUBSCRIPTION = gql`
  subscription noteAdded {
    noteAdded {
      title
      body
    }
  }
`;

const LastNote = () => {
  const { data } = useSubscription(NOTES_SUBSCRIPTION, {
    variables: {},
  });

  const note = data?.noteAdded;

  if (note) {
    return (
      <Card key={note.title} title={note.title}>
        {note.body}
      </Card>
    );
  }

  return null;
};

export default LastNote;
