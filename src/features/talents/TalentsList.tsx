import React, { useEffect, useState } from 'react';
import { message, Spin, List, Button, Card, Space } from 'antd';
import { useQuery } from '@apollo/client';

import { TALENT_MANY } from '../../constants/queries';

import SingleTalent from './SingleTalent';

const TalentsList = () => {
  const [current, setCurrent] = useState<Talent | undefined>();
  const { loading, error, data } = useQuery(TALENT_MANY);

  useEffect(() => {
    if (error) message.error(error.message);
  }, [error]);

  const handleClick = (talent: Talent) => () => {
    setCurrent(talent);
  };

  const handleCreate = () => {
    setCurrent(undefined);
  };

  const handleRemove = () => {
    setCurrent(undefined);
  };

  return (
    <Spin spinning={loading}>
      <Space align="start" style={{ width: '100%' }}>
        <Card>
          <SingleTalent
            key={current?._id}
            current={current}
            onRemove={handleRemove}
          />
        </Card>
        <Card>
          <List
            dataSource={data?.talentMany ? data.talentMany : []}
            bordered={false}
            loading={loading}
            itemLayout="horizontal"
            header={
              <Button type="primary" onClick={handleCreate}>
                Create new
              </Button>
            }
            renderItem={(item: Talent) => (
              <List.Item key={item._id} onClick={handleClick(item)}>
                <Card title={item.name} size="small" style={{ width: '100%' }}>
                  {item.tag}
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </Spin>
  );
};

export default TalentsList;
