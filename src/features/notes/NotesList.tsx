import React, { useEffect } from 'react';
import { Card, Space, message, Spin } from 'antd';
import { selectNotes, selectNotesStatus } from './notesSlice';
import { useAppSelector } from '../../tools/hooks';

const NotesList = () => {
  const notes = useAppSelector(selectNotes);
  const status = useAppSelector(selectNotesStatus);

  useEffect(() => {
    if (status === 'failed') {
      message.error('Request failed');
    }
  }, [status]);

  return (
    <Spin spinning={status === 'loading'}>
      <Space size={24}>
        {notes.map((note) => (
          <Card key={note.title} title={note.title}>
            {note.body}
          </Card>
        ))}
      </Space>
    </Spin>
  );
};

export default NotesList;
