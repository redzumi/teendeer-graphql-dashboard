import React from 'react';
import { Button, Form, Input, message, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { gql, useMutation } from '@apollo/client';

type User = {
  firstName: String;
  secondName: String;
  login: String;
  notes: {
    type: [];
    default: [];
  };
};

const CREATE_USER = gql`
  mutation userCreateOne($record: CreateOneUserInput!) {
    userCreateOne(record: $record) {
      record {
        login
        firstName
        secondName
      }
    }
  }
`;

const UserForm = () => {
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const [form] = useForm<User>();

  const handleSubmit = () => {
    const record = form.getFieldsValue();
    createUser({ variables: { record } }).catch((error) =>
      message.error(error.message)
    );
  };

  return (
    <Spin spinning={loading}>
      <Form name="form" form={form}>
        <FormItem name="firstName" label="First name">
          <Input />
        </FormItem>
        <FormItem name="secondName" label="Second name">
          <Input />
        </FormItem>
        <FormItem name="login" label="Login">
          <Input />
        </FormItem>
        <Button onClick={handleSubmit}>Add new user</Button>
      </Form>
    </Spin>
  );
};

export default UserForm;
