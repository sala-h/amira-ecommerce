import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Avatar
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = false; // TODO: Replace with actual auth state

  const menuItems = [
    { label: 'Market Research', path: '/research' },
    { label: 'Delivery Management', path: '/delivery' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Payments', path: '/payments' }
  ];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            flexGrow: 1,
            fontWeight: 'bold'
          }}
        >
          E-commerce Assistant
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  selected={isActive(item.path)}
                >
                  {item.label}
                </MenuItem>
              ))}
              {!isAuthenticated && (
                <>
                  <MenuItem onClick={() => handleNavigate('/login')}>
                    Login
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate('/register')}>
                    Register
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  backgroundColor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {isAuthenticated ? (
          <>
            <IconButton
              onClick={handleUserMenuClick}
              sx={{ ml: 2 }}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
            >
              <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={() => handleNavigate('/settings')}>Settings</MenuItem>
              <MenuItem onClick={() => console.log('Logout')}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          !isMobile && (
            <Box sx={{ ml: 2 }}>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{
                  mr: 1,
                  borderRadius: 2,
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)'
                  }
                }}
              >
                Register
              </Button>
            </Box>
          )
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
