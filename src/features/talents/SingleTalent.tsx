import React from 'react';
import { Button, Form, Input, message, Space, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useMutation } from '@apollo/client';

import {
  CREATE_TALENT,
  TALENT_MANY,
  UPDATE_TALENT,
  TALENT_REMOVE,
} from '../../constants/queries';

type Props = {
  current?: Talent;
  onRemove?: () => void;
};

const SingleTalent = ({ current, onRemove }: Props) => {
  const [form] = useForm<Talent>();

  const [updateTalent, { loading: updateLoading }] = useMutation(
    UPDATE_TALENT,
    {
      refetchQueries: [{ query: TALENT_MANY }],
    }
  );

  const [createTalent, { loading: createLoading }] = useMutation(
    CREATE_TALENT,
    {
      refetchQueries: [{ query: TALENT_MANY }],
    }
  );

  const [removeTalent, { loading: removeLoading }] = useMutation(
    TALENT_REMOVE,
    {
      refetchQueries: [{ query: TALENT_MANY }],
    }
  );

  const handleRemove = () => {
    removeTalent({
      variables: {
        talentId: current?._id,
      },
      update: onRemove,
    });
  };

  const handleSubmit = () => {
    const record = form.getFieldsValue();

    if (current) {
      updateTalent({
        variables: {
          id: current._id,
          record,
        },
      }).catch((error) => message.error(error.message));
    } else {
      createTalent({
        variables: {
          record,
        },
      }).catch((error) => message.error(error.message));
    }
  };

  return (
    <Spin spinning={updateLoading || createLoading || removeLoading}>
      <Form name="form" form={form} initialValues={current} layout="vertical">
        <FormItem name="_id" label="Talent ID">
          <Input disabled />
        </FormItem>
        <FormItem name="name" label="Talent name">
          <Input />
        </FormItem>
        <FormItem name="tag" label="Talent tag">
          <Input.TextArea />
        </FormItem>
        <Space>
          <Button onClick={handleSubmit}>
            {current ? 'Update talent' : 'Create talent'}
          </Button>
          {current && (
            <Button onClick={handleRemove} type="dashed" danger>
              Remove talent
            </Button>
          )}
        </Space>
      </Form>
    </Spin>
  );
};

export default SingleTalent;
