import { Box, Button, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';

export const Error = () => {
  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Typography variant='h3' gutterBottom>
          Error 404
        </Typography>
        <Typography variant='body1' gutterBottom>
          Page Not Found
        </Typography>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Button variant='outlined' size='medium'>
            Back to Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
};
