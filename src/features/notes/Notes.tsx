import React, { useEffect } from 'react';
import { Button, Card, Form, Space, Input, message, Spin, Divider } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import {
  add,
  createNoteAndAdd,
  Note,
  selectNotes,
  selectNotesStatus,
} from './notesSlice';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';

const Notes = () => {
  const notes = useAppSelector(selectNotes);
  const status = useAppSelector(selectNotesStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'failed') {
      message.error('Request failed');
    }
  }, [status]);

  const [form] = useForm<Note>();

  const handleSubmit = () => {
    const note = form.getFieldsValue();
    dispatch(add(note));
  };

  const handleSubmitAsync = () => {
    const note = form.getFieldsValue();
    dispatch(createNoteAndAdd(note));
  };

  return (
    <Spin spinning={status === 'loading'}>
      <Space size={24}>
        {notes.map((note) => (
          <Card key={note.title} title={note.title}>
            {note.body}
          </Card>
        ))}
      </Space>
      <Divider />
      <Form name="form" form={form}>
        <FormItem name="title" label="Title for note">
          <Input />
        </FormItem>
        <FormItem name="body" label="Body for note">
          <Input.TextArea />
        </FormItem>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={handleSubmitAsync}>Submit Async</Button>
      </Form>
    </Spin>
  );
};

export default Notes;
