import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Card, Divider, List, message, Space, Spin } from 'antd';

import { CURRENT_USER, ADD_TALENTS } from '../../constants/queries';
import UserForm from './UserForm';
import TalentsSelect from '../../components/TalentsSelect/TalentsSelect';

type User = {
  _id: string;
  firstName: string;
  secondName: string;
  login: string;
  talents: string[];
};

type Talent = {
  _id: string;
  name: string;
  tag: string;
};

const CurrentUser = () => {
  const { loading, error, data } = useQuery(CURRENT_USER);
  const [addTalents] = useMutation(ADD_TALENTS, {
    refetchQueries: [{ query: CURRENT_USER }],
  });

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  const handleChange = (talents: Talent[]) => {
    addTalents({
      variables: { talentsIds: talents.map((talent) => talent._id) },
    });
  };

  return (
    <Spin spinning={loading}>
      <Space direction="vertical">
        <Card>
          <List
            dataSource={data?.me ? [data.me] : []}
            bordered={false}
            loading={loading}
            size="small"
            renderItem={(item: User) => (
              <List.Item key={item._id} style={{ minWidth: 450 }}>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                  }
                  title={<b>{item.login}</b>}
                  description={
                    <Space direction="vertical">
                      {`${item.firstName} ${item.secondName}`}
                      <Divider />
                      <TalentsSelect
                        talents={data?.talentMany}
                        selectedIds={Object.keys(item.talents)}
                        onFinish={handleChange}></TalentsSelect>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
        <Card>
          <UserForm />
        </Card>
      </Space>
    </Spin>
  );
};

export default CurrentUser;
