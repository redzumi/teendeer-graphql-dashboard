import React, { useEffect } from 'react';
import { Button, Card, Form, Input, message, Space, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import {
  CHALLENGE_MANY,
  TALENT_MANY,
  UPDATE_CHALLENGE,
  CREATE_CHALLENGE,
  CHALLENGE_REMOVE,
} from '../../constants/queries';

import TalentsSelect from '../../components/TalentsSelect/TalentsSelect';
import TasksList from '../task/TasksList';

type Props = {
  current?: Challenge;
};

const SingleChallenge = ({ current }: Props) => {
  const history = useHistory();
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

  const [removeChallenge, { loading: removeLoading }] = useMutation(
    CHALLENGE_REMOVE,
    {
      refetchQueries: [{ query: CHALLENGE_MANY }],
    }
  );

  const handleRemove = () => {
    removeChallenge({
      variables: {
        challengeId: current?._id,
      },
      update: () => {
        history.push(`/challenges`);
      },
    });
  };

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
        update: () => {
          history.push(`/challenges`);
        },
      }).catch((error) => message.error(error.message));
    }
  };

  const handleTalentsChange = (talents: Talent[]) => {
    form.setFieldsValue({ talentsIds: talents.map((talent) => talent._id) });
  };

  return (
    <Spin
      spinning={
        updateLoading || createLoading || talentsLoading || removeLoading
      }>
      <Space>
        <Card>
          <Form
            name="form"
            form={form}
            initialValues={current}
            layout="vertical">
            <FormItem name="_id" label="Challenge ID">
              <Input disabled />
            </FormItem>
            <FormItem name="name" label="Challenge name">
              <Input />
            </FormItem>
            <FormItem name="description" label="Challenge description">
              <Input.TextArea />
            </FormItem>
            <FormItem name="talentsIds" label="Challenge talents">
              <div style={{ width: '100%', display: 'flex' }}>
                <TalentsSelect
                  key={current?._id}
                  talents={data?.talentMany}
                  selectedIds={current?.talentsIds}
                  onFinish={handleTalentsChange}
                />
              </div>
            </FormItem>
            <Space>
              <Button onClick={handleSubmit}>
                {current ? 'Update challenge' : 'Create challenge'}
              </Button>
              {current && (
                <Button type="dashed" danger={true} onClick={handleRemove}>
                  Remove challenge
                </Button>
              )}
            </Space>
          </Form>
        </Card>
        <TasksList />
      </Space>
    </Spin>
  );
};

export default SingleChallenge;
