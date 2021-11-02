import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Avatar, Checkbox, List, message, Space, Spin } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import { CURRENT_USER, ADD_TALENTS } from '../../constants/queries';

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

  const handleChange = (values: CheckboxValueType[]) => {
    addTalents({ variables: { talentsIds: values } });
  };

  return (
    <Spin spinning={loading}>
      <List
        dataSource={data?.me ? [data.me] : []}
        bordered
        loading={loading}
        renderItem={(item: User) => (
          <List.Item key={item._id} style={{ minWidth: 450 }}>
            <List.Item.Meta
              avatar={
                <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
              }
              title={<b>{item.login}</b>}
              description={
                <Space direction="vertical" wrap={true}>
                  {`${item.firstName} ${item.secondName}`}
                  <Checkbox.Group
                    onChange={handleChange}
                    defaultValue={Object.keys(data?.me?.talents)}>
                    {data?.talentMany?.map((talent: Talent) => (
                      <Checkbox value={talent._id}>{talent.name}</Checkbox>
                    ))}
                  </Checkbox.Group>
                </Space>
              }></List.Item.Meta>
          </List.Item>
        )}
      />
    </Spin>
  );
};

export default CurrentUser;
