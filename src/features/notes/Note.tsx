import React from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { Note } from './notesSlice';
import { gql, useMutation } from '@apollo/client';

const NOTE_MANY = gql`
  query noteMany {
    noteMany {
      _id
      title
      body
    }
  }
`;

const NOTE_CREATE_ONE = gql`
  mutation noteCreateOne($record: CreateOneNoteInput!) {
    noteCreateOne(record: $record) {
      record {
        body
        title
      }
    }
  }
`;

const Notes = () => {
  const [form] = useForm<Note>();
  const [noteCreateOne, { loading }] = useMutation(NOTE_CREATE_ONE, {
    refetchQueries: [{ query: NOTE_MANY }],
  });

  const handleSubmit = () => {
    const record = form.getFieldsValue();
    noteCreateOne({
      variables: {
        record,
      },
    }).catch((error) => message.error(error.message));
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
