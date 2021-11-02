import React from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { gql, useMutation } from '@apollo/client';

import { TALENT_MANY } from '../../constants/queries';

type Props = {
  current?: Talent;
};

const UPDATE_TALENT = gql`
  mutation updateTalent($id: MongoID!, $record: UpdateByIdTalentInput!) {
    talentUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;

const CREATE_TALENT = gql`
  mutation createTalent($record: CreateOneTalentInput!) {
    talentCreateOne(record: $record) {
      recordId
    }
  }
`;

const SingleTalent = ({ current }: Props) => {
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
    <Spin spinning={updateLoading || createLoading}>
      <Form name="form" form={form} initialValues={current}>
        <FormItem name="name" label="Talent name">
          <Input />
        </FormItem>
        <FormItem name="tag" label="Talent tag">
          <Input.TextArea />
        </FormItem>
        <Button onClick={handleSubmit}>
          {current ? 'Update talent' : 'Create talent'}
        </Button>
      </Form>
    </Spin>
  );
};

export default SingleTalent;
