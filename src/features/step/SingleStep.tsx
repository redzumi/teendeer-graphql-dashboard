import React from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useMutation } from '@apollo/client';

import {
  CREATE_STEP,
  STEP_BY_TASK,
  UPDATE_STEP,
} from '../../constants/queries';
import { useParams } from 'react-router-dom';

type Props = {
  current?: Step;
};

const SingleStep = ({ current }: Props) => {
  const [form] = useForm<Step>();
  const params = useParams<{ taskId: string }>();
  const { taskId } = params;

  const [updateStep, { loading: updateLoading }] = useMutation(UPDATE_STEP, {
    refetchQueries: [{ query: STEP_BY_TASK, variables: { taskId } }],
  });

  const [createStep, { loading: createLoading }] = useMutation(CREATE_STEP, {
    refetchQueries: [{ query: STEP_BY_TASK, variables: { taskId } }],
  });

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
      }).catch((error) => message.error(error.message));
    }
  };

  return (
    <Spin spinning={updateLoading || createLoading}>
      <Form name="form" form={form} initialValues={current || { taskId }}>
        <FormItem name="name" label="Step name">
          <Input />
        </FormItem>
        <FormItem name="description" label="Step description">
          <Input.TextArea />
        </FormItem>
        <FormItem name="taskId" label="ID of task">
          <Input disabled />
        </FormItem>
        <Button onClick={handleSubmit}>
          {current ? 'Update step' : 'Create step'}
        </Button>
      </Form>
    </Spin>
  );
};

export default SingleStep;
