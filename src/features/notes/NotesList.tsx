import React, { useEffect } from 'react';
import { Card, Space, message, Spin } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { Note } from './notesSlice';

const NOTE_MANY = gql`
  query noteMany {
    noteMany {
      _id
      title
      body
    }
  }
`;

const NotesList = () => {
  const { loading, error, data } = useQuery(NOTE_MANY);

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  return (
    <Spin spinning={loading}>
      <Space
        size={24}
        wrap={true}
        align="center"
        style={{ justifyContent: 'center ' }}>
        {data?.noteMany?.map((note: Note) => (
          <Card key={note.title} title={note.title}>
            {note.body}
          </Card>
        ))}
      </Space>
    </Spin>
  );
};

export default NotesList;
