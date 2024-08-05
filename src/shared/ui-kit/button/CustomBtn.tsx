import { Button } from '@mui/material';
import type { MouseEventHandler } from 'react';

type BtnProps = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
  sx?: object;
};

const btn = {
  mt: '2rem',
  mb: '1rem',
  display: { xs: 'flex', md: 'flex' }
};

export const CustomBtn = ({ children, fullWidth = true, ...props }: BtnProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ ...btn, width: fullWidth ? '100%' : 'auto' }}
      {...props}
    >
      {children}
    </Button>
  );
};