import React from 'react';
import { gql, useMutation, useSubscription } from '@apollo/client';
import { Button, Card, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
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

const NOTE_ADDED = gql`
  subscription noteAdded {
    noteAdded {
      _id
      title
      body
    }
  }
`;

const NOTE_UPDATE_BY_ID = gql`
  mutation noteUpdateById($id: MongoID!, $record: UpdateByIdNoteInput!) {
    noteUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;

const LastNote = () => {
  const { data } = useSubscription(NOTE_ADDED);
  const [form] = useForm<Note>();

  const currentNote: Note = data?.noteAdded;
  const [noteUpdateById, { loading }] = useMutation(NOTE_UPDATE_BY_ID, {
    refetchQueries: [{ query: NOTE_MANY }],
  });

  const handleSubmit = () => {
    const record = form.getFieldsValue();
    noteUpdateById({
      variables: {
        id: currentNote._id,
        record,
      },
    }).catch((error) => message.error(error.message));
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
