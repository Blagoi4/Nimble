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
  mt: '1rem',
  mb: '1rem',
  backgroundColor:'white',
  color: 'black',
  border: '1px solid #AAAAAA',
  display: { xs: 'flex', md: 'flex' },
  ':hover': {
    backgroundColor: '#A6A6A6', // Цвет при наведении
  }
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