import { Button } from '@mui/material';

import type { MouseEventHandler } from 'react';

type BtnProps = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
};

const btn = {
  mt: '1rem',
  mb: '1rem',
  display: { xs: 'flex', md: 'flex' }
};

export const CustomBtn = ({ children, ...props }: BtnProps) => {
  return (
    <Button variant='outlined' size='medium' sx={btn} {...props}>
      {children}
    </Button>
  );
};
