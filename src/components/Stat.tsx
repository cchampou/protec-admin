import React from 'react';
import { Card } from 'baseui/card';

type Props = {
  number: number;
  label: string;
};

const Stat = ({ label, number }: Props) => {
  return (
    <Card
      overrides={{
        Root: {
          style: {
            margin: '8px',
            textAlign: 'center',
          },
        },
      }}
    >
      {number}
      <br />
      <strong>{label}</strong>
    </Card>
  );
};

export default Stat;
