import React from 'react';
import { Button, Form, Input, message, Space, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useMutation } from '@apollo/client';

import {
  CREATE_STEP,
  STEP_BY_TASK,
  STEP_REMOVE,
  UPDATE_STEP,
} from '../../constants/queries';
import { useHistory, useParams } from 'react-router-dom';

type Props = {
  current?: Step;
};

const SingleStep = ({ current }: Props) => {
  const history = useHistory();
  const [form] = useForm<Step>();
  const params = useParams<{ taskId: string; challengeId: string }>();
  const { challengeId, taskId } = params;

  const [updateStep, { loading: updateLoading }] = useMutation(UPDATE_STEP, {
    refetchQueries: [{ query: STEP_BY_TASK, variables: { taskId } }],
  });

  const [createStep, { loading: createLoading }] = useMutation(CREATE_STEP, {
    refetchQueries: [{ query: STEP_BY_TASK, variables: { taskId } }],
  });

  const [removeStep, { loading: removeLoading }] = useMutation(STEP_REMOVE, {
    refetchQueries: [{ query: STEP_BY_TASK, variables: { taskId } }],
  });

  const handleRemove = () => {
    removeStep({
      variables: {
        stepId: current?._id,
      },
      update: () => {
        history.push(`/challenges/${challengeId}/${taskId}`);
      },
    });
  };

  const handleSubmit = () => {
    const record = form.getFieldsValue();

    if (current) {
      updateStep({
        variables: {
          id: current._id,
          record,
        },
      }).catch((error) => message.error(error.message));
    } else {
      createStep({
        variables: {
          record,
        },
        update: () => {
          history.push(`/challenges/${challengeId}/${taskId}`);
        },
      }).catch((error) => message.error(error.message));
    }
  };

  return (
    <Spin spinning={updateLoading || createLoading || removeLoading}>
      <Form
        name="form"
        form={form}
        layout="vertical"
        initialValues={current || { taskId }}>
        <FormItem name="name" label="Step name">
          <Input />
        </FormItem>
        <FormItem name="description" label="Step description">
          <Input.TextArea />
        </FormItem>
        <FormItem name="taskId" label="ID of task">
          <Input disabled />
        </FormItem>
        <Space>
          <Button onClick={handleSubmit}>
            {current ? 'Update step' : 'Create step'}
          </Button>
          {current && (
            <Button type="dashed" danger={true} onClick={handleRemove}>
              Remove step
            </Button>
          )}
        </Space>
      </Form>
    </Spin>
  );
};

export default SingleStep;
