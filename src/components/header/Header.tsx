import { AppBar, Toolbar, Container } from '@mui/material';

import { Logo } from './logo/Logo';

function Header() {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Logo />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
