import React, { useEffect, useState } from 'react';
import { message, Spin, List, Button } from 'antd';
import { useQuery } from '@apollo/client';

import { TALENT_MANY } from '../../constants/queries';

import styles from './talents.module.less';
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
      <SingleTalent
        key={current?._id}
        current={current}
        onRemove={handleRemove}
      />
      <Button onClick={handleCreate}>Create new</Button>
      <List
        dataSource={data?.talentMany ? data.talentMany : []}
        bordered={false}
        loading={loading}
        itemLayout="horizontal"
        size="small"
        renderItem={(item: Talent) => (
          <List.Item
            key={item._id}
            className={styles.talentItem}
            onClick={handleClick(item)}>
            <List.Item.Meta title={<b>{item.name}</b>} description={item.tag} />
          </List.Item>
        )}
      />
    </Spin>
  );
};

export default TalentsList;
