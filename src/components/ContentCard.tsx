import React from 'react';
import BackButton from './BackButton';
import { HeadingSmall } from 'baseui/typography';
import { Card } from 'baseui/card';

type Props = {
  children?: React.ReactNode;
  title: string;
  previousPath?: string;
};

const ContentCard = ({ children, title, previousPath }: Props) => {
  return (
    <Card>
      {previousPath && <BackButton path={previousPath} />}
      <HeadingSmall>{title}</HeadingSmall>
      {children}
    </Card>
  );
};

export default ContentCard;
