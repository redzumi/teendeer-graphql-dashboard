import React from 'react';
import { Button, Card, Divider, Form, Input, message, Space, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useMutation } from '@apollo/client';

import {
  CREATE_TASK,
  TASK_BY_CHALLENGE,
  TASK_REMOVE,
  UPDATE_TASK,
} from '../../constants/queries';
import { useHistory, useParams } from 'react-router-dom';
import StepsList from '../step/StepsList';

type Props = {
  current?: Task;
};

const SingleTask = ({ current }: Props) => {
  const history = useHistory();
  const [form] = useForm<Task>();
  const params = useParams<{ taskId: string; challengeId: string }>();
  const { challengeId } = params;

  const [updateTask, { loading: updateLoading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: TASK_BY_CHALLENGE, variables: { challengeId } }],
  });

  const [createTask, { loading: createLoading }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: TASK_BY_CHALLENGE, variables: { challengeId } }],
  });

  const [removeTask, { loading: removeLoading }] = useMutation(TASK_REMOVE, {
    refetchQueries: [{ query: TASK_BY_CHALLENGE, variables: { challengeId } }],
  });

  const handleRemove = () => {
    removeTask({
      variables: {
        taskId: current?._id,
      },
      update: () => {
        history.push(`/challenges/${challengeId}/`);
      },
    });
  };

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
        update: () => {
          history.push(`/challenges/${challengeId}/`);
        },
      }).catch((error) => message.error(error.message));
    }
  };

  return (
    <Spin spinning={updateLoading || createLoading || removeLoading}>
      <Space direction="vertical">
        <Form
          name="form"
          form={form}
          layout="vertical"
          initialValues={current || { challengeId }}>
          <FormItem name="name" label="Task name">
            <Input />
          </FormItem>
          <FormItem name="description" label="Task description">
            <Input.TextArea />
          </FormItem>
          <FormItem name="challengeId" label="ID of challenge">
            <Input disabled />
          </FormItem>
          <Space>
            <Button onClick={handleSubmit}>
              {current ? 'Update task' : 'Create task'}
            </Button>
            {current && (
              <Button type="dashed" danger={true} onClick={handleRemove}>
                Remove task
              </Button>
            )}
          </Space>
        </Form>
        <Divider />
        <Card>
          <StepsList />
        </Card>
      </Space>
    </Spin>
  );
};

export default SingleTask;
