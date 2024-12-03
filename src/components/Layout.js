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
  Store as StoreIcon,
  Chat as ChatIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  KeyboardArrowDown as ArrowDownIcon,
  Search as SearchIcon,
  LocalShipping as DeliveryIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DRAWER_WIDTH = 280;

const menuItems = [
  { text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'المتجر', icon: <StoreIcon />, path: '/store' },
  { text: 'المساعد الذكي', icon: <ChatIcon />, path: '/chat' },
  { text: 'البحث عن المنتجات', icon: <SearchIcon />, path: '/product-research' },
  { text: 'إدارة التوصيل', icon: <DeliveryIcon />, path: '/delivery' },
  { text: 'التحليلات', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'المدفوعات', icon: <PaymentIcon />, path: '/payments' },
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
          <img 
            src="logo" 
            alt="Logo" 
            loading="eager" 
            width="40" 
            height="40"
          />
          أميرة
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
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ px: 2 }}>
        <ListItem
          button
          component={Link}
          to="/settings"
          sx={{
            borderRadius: 2,
            backgroundColor: location.pathname === '/settings' ? 
              theme.palette.primary.main + '20' : 'transparent',
            color: location.pathname === '/settings' ? 
              theme.palette.primary.main : theme.palette.text.primary,
          }}
        >
          <ListItemIcon sx={{
            color: location.pathname === '/settings' ? 
              theme.palette.primary.main : theme.palette.text.primary,
          }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="الإعدادات" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          backgroundColor: 'white',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: 'divider',
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
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  رفيق رحماني
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  مدير
                </Typography>
              </Box>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
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
              borderRight: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: DRAWER_WIDTH,
              borderRight: 'none',
              boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: '64px',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </Box>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        onClick={handleUserMenuClose}
        sx={{ mt: '45px' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          الإعدادات
        </MenuItem>
        <MenuItem onClick={() => navigate('/login')}>
          تسجيل الخروج
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        onClick={handleNotificationsClose}
        sx={{ mt: '45px' }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem>طلب جديد #1234</MenuItem>
        <MenuItem>رسالة من العميل محمد</MenuItem>
        <MenuItem>تحديث النظام متوفر</MenuItem>
      </Menu>
    </Box>
  );
}

export default Layout;
