import React from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useMutation } from '@apollo/client';

import {
  CREATE_TASK,
  TASK_BY_CHALLENGE,
  UPDATE_TASK,
} from '../../constants/queries';
import { useParams } from 'react-router-dom';

type Props = {
  current?: Task;
};

const SingleTask = ({ current }: Props) => {
  const [form] = useForm<Task>();
  const params = useParams<{ taskId: string; challengeId: string }>();
  const { challengeId } = params;

  const [updateTask, { loading: updateLoading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: TASK_BY_CHALLENGE, variables: { challengeId } }],
  });

  const [createTask, { loading: createLoading }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: TASK_BY_CHALLENGE, variables: { challengeId } }],
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
      <Form name="form" form={form} initialValues={current || { challengeId }}>
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
