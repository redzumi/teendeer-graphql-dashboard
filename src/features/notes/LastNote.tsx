import React from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { Button, Card, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Note } from './notesSlice';

const GET_NOTES = gql`
  query GetNotes {
    notes {
      id
      title
    }
  }
`;

const NOTES_SUBSCRIPTION = gql`
  subscription noteAdded {
    noteAdded {
      id
      title
      body
    }
  }
`;

const EDIT_NOTE = gql`
  mutation editNote($id: String!, $title: String!, $body: String!) {
    editNote(id: $id, title: $title, body: $body) {
      id
      title
      body
    }
  }
`;

const LastNote = () => {
  const [editNote, { loading }] = useMutation(EDIT_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const { data } = useSubscription(NOTES_SUBSCRIPTION, {
    variables: {},
  });

  const currentNote = data?.noteAdded;

  const [form] = useForm<Note>();

  const handleSubmit = () => {
    const note = form.getFieldsValue();
    editNote({ variables: { id: currentNote.id, ...note } }).catch((error) =>
      message.error(error.message)
    );
  };

  if (currentNote) {
    return (
      <Card key={currentNote.title} title={currentNote.title}>
        {currentNote.body}
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
      </Card>
    );
  }

  return null;
};

export default LastNote;
