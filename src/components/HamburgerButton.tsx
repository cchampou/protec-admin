import React, {
  ButtonHTMLAttributes,
  HTMLProps,
  MouseEventHandler,
} from 'react';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';

type HamburgerButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const HamburgerButton = ({ onClick }: HamburgerButtonProps) => {
  return (
    <Block position="fixed" top="scale800" right="scale800">
      <Button type="button" onClick={onClick}>
        Menu
      </Button>
    </Block>
  );
};

export default HamburgerButton;
