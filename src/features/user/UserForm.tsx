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

const GET_USERS = gql`
  query userMany {
    userMany {
      _id
      firstName
    }
  }
`;

const CREATE_USER = gql`
  mutation userCreateOne(
    $firstName: String!
    $secondName: String!
    $login: String!
  ) {
    userCreateOne(
      record: { firstName: $firstName, secondName: $secondName, login: $login }
    ) {
      recordId
    }
  }
`;

const UserForm = () => {
  const [createUser, { loading }] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });
  const [form] = useForm<User>();

  const handleSubmit = () => {
    const user = form.getFieldsValue();
    createUser({ variables: user }).catch((error) =>
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
