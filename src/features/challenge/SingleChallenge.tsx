import React, { useEffect } from 'react';
import { Button, Card, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useMutation, useQuery } from '@apollo/client';

import {
  CHALLENGE_MANY,
  TALENT_MANY,
  UPDATE_CHALLENGE,
  CREATE_CHALLENGE,
} from '../../constants/queries';

import TalentsSelect from '../../components/TalentsSelect/TalentsSelect';
import TasksList from '../task/TasksList';

type Props = {
  current?: Challenge;
};

const SingleChallenge = ({ current }: Props) => {
  const { loading: talentsLoading, error, data } = useQuery(TALENT_MANY);
  const [form] = useForm<Challenge>();

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  const [updateChallenge, { loading: updateLoading }] = useMutation(
    UPDATE_CHALLENGE,
    {
      refetchQueries: [{ query: CHALLENGE_MANY }],
    }
  );

  const [createChallenge, { loading: createLoading }] = useMutation(
    CREATE_CHALLENGE,
    {
      refetchQueries: [{ query: CHALLENGE_MANY }],
    }
  );

  const handleSubmit = () => {
    const record = form.getFieldsValue();

    if (current) {
      updateChallenge({
        variables: {
          id: current._id,
          record,
        },
      }).catch((error) => message.error(error.message));
    } else {
      createChallenge({
        variables: {
          record,
        },
      }).catch((error) => message.error(error.message));
    }
  };

  const handleTalentsChange = (talents: Talent[]) => {
    form.setFieldsValue({ talentsIds: talents.map((talent) => talent._id) });
  };

  return (
    <Spin spinning={updateLoading || createLoading || talentsLoading}>
      <Form name="form" form={form} initialValues={current}>
        <FormItem name="name" label="Challenge name">
          <Input />
        </FormItem>
        <FormItem name="description" label="Challenge description">
          <Input.TextArea />
        </FormItem>
        <FormItem name="talentsIds" label="Challenge description">
          <TalentsSelect
            key={current?._id}
            talents={data?.talentMany}
            selectedIds={current?.talentsIds}
            onFinish={handleTalentsChange}
          />
        </FormItem>
        <Button onClick={handleSubmit}>
          {current ? 'Update challenge' : 'Create challenge'}
        </Button>
      </Form>
      <Card>
        <TasksList />
      </Card>
    </Spin>
  );
};

export default SingleChallenge;
