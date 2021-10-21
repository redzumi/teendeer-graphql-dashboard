import React, { useEffect } from 'react';
import { Card, Space, message, Spin } from 'antd';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { Note } from './notesSlice';

// const GET_NOTES = gql`
//   query GetNotes {
//     notes {
//       id
//       title
//     }
//   }
// `;

const NOTES_SUBSCRIPTION = gql`
  subscription noteAdded {
    noteAdded {
      title
      body
    }
  }
`;

const NotesList = () => {
  // const { loading, error, data } = useQuery(GET_NOTES, {
  //   variables: {},
  //   pollInterval: 5000
  // });

  // useEffect(() => {
  //   if (error) message.error('Request failed');
  // }, [error]);
  const { data, loading } = useSubscription(NOTES_SUBSCRIPTION, {
    variables: {},
  });

  return (
    <Spin spinning={loading}>
      {`${loading}`}
      {JSON.stringify(data)}
      <Space
        size={24}
        wrap={true}
        align="center"
        style={{ justifyContent: 'center ' }}>
        {data?.notes?.map((note: Note) => (
          <Card key={note.title} title={note.title}>
            {note.body}
          </Card>
        ))}
      </Space>
    </Spin>
  );
};

export default NotesList;
