import React from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { gql, useMutation } from '@apollo/client';

import { TASK_MANY } from '../../constants/queries';

type Props = {
  current?: Task;
};

const UPDATE_TASK = gql`
  mutation updateTask($id: MongoID!, $record: UpdateByIdTaskInput!) {
    taskUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;

const CREATE_TASK = gql`
  mutation createTask($record: CreateOneTaskInput!) {
    taskCreateOne(record: $record) {
      recordId
    }
  }
`;

const SingleTask = ({ current }: Props) => {
  const [form] = useForm<Task>();

  const [updateTask, { loading: updateLoading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: TASK_MANY }],
  });

  const [createTask, { loading: createLoading }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: TASK_MANY }],
  });

  const handleSubmit = () => {
    const record = form.getFieldsValue();

    if (current) {
      updateTask({
        variables: {
          id: current._id,
          record,
        },
      }).catch((error) => message.error(error.message));
    } else {
      createTask({
        variables: {
          record,
        },
      }).catch((error) => message.error(error.message));
    }
  };

  return (
    <Spin spinning={updateLoading || createLoading}>
      <Form name="form" form={form} initialValues={current}>
        <FormItem name="name" label="Task name">
          <Input />
        </FormItem>
        <FormItem name="description" label="Task description">
          <Input.TextArea />
        </FormItem>
        <FormItem name="challengeId" label="ID of challenge">
          <Input disabled />
        </FormItem>
        <Button onClick={handleSubmit}>
          {current ? 'Update task' : 'Create task'}
        </Button>
      </Form>
    </Spin>
  );
};

export default SingleTask;
