import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Toolbar,
  AppBar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Divider,
  Button,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  LocalShipping as DeliveryIcon,
  Analytics as AnalyticsIcon,
  Payment as PaymentIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AIChatbot from './AIChatbot';

const DRAWER_WIDTH = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Market Research', icon: <SearchIcon />, path: '/research' },
  { text: 'Delivery Management', icon: <DeliveryIcon />, path: '/delivery' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Payments', icon: <PaymentIcon />, path: '/payments' },
  { text: 'AI Assistant', icon: <ChatIcon />, path: '/chat' },
];

function Layout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const drawer = (
    <Box sx={{ height: '100%', backgroundColor: theme.palette.background.paper }}>
      <Toolbar sx={{ px: 2 }}>
        <Typography variant="h6" component={Link} to="/" sx={{ 
          textDecoration: 'none', 
          color: theme.palette.primary.main,
          fontWeight: 700,
          fontSize: '1.5rem',
        }}>
          DZ Commerce
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={{
              borderRadius: 2,
              mb: 1,
              backgroundColor: location.pathname === item.path ? 
                theme.palette.primary.main + '20' : 'transparent',
              color: location.pathname === item.path ? 
                theme.palette.primary.main : theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.primary.main + '10',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <ListItemIcon sx={{
              color: location.pathname === item.path ? 
                theme.palette.primary.main : theme.palette.text.primary,
              minWidth: 40,
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            />
            {item.text === 'AI Assistant' && (
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  ml: 1,
                }}
              >
                New
              </Box>
            )}
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ px: 2 }}>
        <ListItem
          button
          component={Link}
          to="/settings"
          sx={{ borderRadius: 2 }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Button
              onClick={handleUserMenuClick}
              sx={{
                textTransform: 'none',
                color: 'inherit',
              }}
              endIcon={<ArrowDownIcon />}
            >
              <Avatar sx={{ width: 32, height: 32, mr: 1 }}>R</Avatar>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Rafik Rahmani
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Admin
                </Typography>
              </Box>
            </Button>
          </Box>

          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            PaperProps={{
              sx: { width: 200, mt: 1 }
            }}
          >
            <MenuItem onClick={() => { navigate('/profile'); handleUserMenuClose(); }}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => { navigate('/settings'); handleUserMenuClose(); }}>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleUserMenuClose} sx={{ color: 'error.main' }}>
              Logout
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={notificationsAnchor}
            open={Boolean(notificationsAnchor)}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: { width: 320, maxHeight: 400, mt: 1 }
            }}
          >
            <MenuItem onClick={handleNotificationsClose}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  New Order #1234
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  New order received from Ahmed in Algiers
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  2 minutes ago
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleNotificationsClose}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  Payment Collected
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Successfully collected payment for order #1230
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  1 hour ago
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: DRAWER_WIDTH,
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: DRAWER_WIDTH,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <Toolbar /> {/* Add spacing for the AppBar */}
        {children}
      </Box>
      <AIChatbot />
    </Box>
  );
}

export default Layout;
