import React from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Note } from './notesSlice';
import { gql, useMutation } from '@apollo/client';

const ADD_NOTE = gql`
  mutation addNote($title: String!, $body: String!) {
    addNote(title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

const Notes = () => {
  const [addNote, { loading }] = useMutation(ADD_NOTE);
  const [form] = useForm<Note>();

  const handleSubmit = () => {
    const note = form.getFieldsValue();
    addNote({ variables: note }).catch((error) => message.error(error.message));
  };

  return (
    <Spin spinning={loading}>
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
