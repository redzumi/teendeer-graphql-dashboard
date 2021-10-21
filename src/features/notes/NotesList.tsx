import React, { useEffect } from 'react';
import { Card, Space, message, Spin } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { Note } from './notesSlice';

const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      title
    }
  }
`;

const NotesList = () => {
  const { loading, error, data } = useQuery(GET_NOTES, {
    variables: {},
  });

  useEffect(() => {
    if (error) message.error('Request failed');
  }, [error]);

  return (
    <Spin spinning={loading}>
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
