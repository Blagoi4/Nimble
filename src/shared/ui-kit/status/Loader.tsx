import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const boxStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px'
};

export const Loader = () => {
  return (
    <Box sx={boxStyles}>
      <CircularProgress />
    </Box>
  );
};
