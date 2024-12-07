import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* App Logo or Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          UADMS APP
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button color="inherit" href="/register">Register</Button>
          <Button color="inherit" href="/login">Login</Button>
          <Button color="inherit" href="/">Home</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
