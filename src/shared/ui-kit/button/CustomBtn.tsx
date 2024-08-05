import { Button } from '@mui/material';
import type { MouseEventHandler } from 'react';

type BtnProps = {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
};

export const CustomBtn = ({ children, fullWidth = true, ...props }: BtnProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ mt: 2, width: fullWidth ? '100%' : 'auto' }}
      {...props}
    >
      {children}
    </Button>
  );
};