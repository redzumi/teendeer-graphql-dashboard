import React, { useEffect, useState } from 'react';
import { Space, Tag } from 'antd';

const { CheckableTag } = Tag;

type Props = {
  talents: Talent[];
  selectedIds?: string[];
  onFinish?: (selectedTalents: Talent[]) => void;
};

const TalentsSelect = ({ talents, selectedIds = [], onFinish }: Props) => {
  const [selectedTalents, setSelectedTalents] = useState<Talent[]>([]);

  useEffect(() => {
    const selectedByIds = talents?.filter((talent) =>
      selectedIds?.includes(talent._id)
    );
    setSelectedTalents(selectedByIds || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (onFinish) {
      onFinish(selectedTalents);
    }
  }, [onFinish, selectedTalents]);

  const handleSelect = (value: Talent, state: boolean) => {
    if (state) {
      setSelectedTalents([...selectedTalents, value]);
    } else {
      setSelectedTalents([...selectedTalents].filter((tag) => tag !== value));
    }
  };

  return (
    <Space wrap={true}>
      {talents?.map((talent) => {
        if (onFinish) {
          return (
            <CheckableTag
              key={talent._id}
              style={{ padding: 8, border: `1px dashed #520339` }}
              checked={selectedTalents.indexOf(talent) > -1}
              onChange={(checked) => handleSelect(talent, checked)}>
              {talent.name}
            </CheckableTag>
          );
        }

        return (
          <Tag key={talent._id} style={{ padding: 12 }} color="default">
            {talent.name}
          </Tag>
        );
      })}
    </Space>
  );
};

export default TalentsSelect;
