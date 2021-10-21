import React, { useEffect } from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { createNote, Note, selectNotesStatus } from './notesSlice';
import { useAppDispatch, useAppSelector } from '../../tools/hooks';

const Notes = () => {
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
    dispatch(createNote(note));
  };

  return (
    <Spin spinning={status === 'loading'}>
      <Form name="form" form={form}>
        <FormItem name="title" label="Title for note">
          <Input />
        </FormItem>
        <FormItem name="body" label="Body for note">
          <Input.TextArea />
        </FormItem>
        <Button onClick={handleSubmit}>Add new note</Button>
      </Form>
    </Spin>
  );
};

export default Notes;
