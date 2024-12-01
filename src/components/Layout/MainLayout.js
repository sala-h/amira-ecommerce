import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Fade,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import InsightsIcon from '@mui/icons-material/Insights';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 280;

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
  color: theme.palette.text.primary,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    background: 'linear-gradient(135deg, #004C3F 0%, #002E25 100%)',
    color: 'white',
    borderRight: 'none',
  },
}));

const Logo = styled('img')({
  height: 40,
  marginRight: 16,
});

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: '8px 16px',
  borderRadius: 12,
  backgroundColor: active ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
}));

const menuItems = [
  { text: 'لوحة التحكم', textEn: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { text: 'المحادثة', textEn: 'Chat', icon: ChatIcon, path: '/chat' },
  { text: 'التحليلات', textEn: 'Analytics', icon: InsightsIcon, path: '/analytics' },
  { text: 'المتجر', textEn: 'Store', icon: StorefrontIcon, path: '/store' },
  { text: 'المدفوعات', textEn: 'Payments', icon: PaymentIcon, path: '/pricing' },
];

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
        <Logo src="/amira-logo.svg" alt="Amira Logo" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Amira
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1, px: 2 }}>
        {menuItems.map((item) => (
          <StyledListItem
            button
            key={item.path}
            active={location.pathname === item.path ? 1 : 0}
            onClick={() => {
              navigate(item.path);
              if (isMobile) setMobileOpen(false);
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
              <item.icon />
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              secondary={item.textEn}
              primaryTypographyProps={{ fontWeight: 500 }}
              secondaryTypographyProps={{ 
                sx: { 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.75rem'
                }
              }}
            />
          </StyledListItem>
        ))}
      </List>

      <Box sx={{ p: 2 }}>
        <StyledListItem
          button
          onClick={() => navigate('/settings')}
          active={location.pathname === '/settings' ? 1 : 0}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText 
            primary="الإعدادات"
            secondary="Settings"
            primaryTypographyProps={{ fontWeight: 500 }}
            secondaryTypographyProps={{ 
              sx: { 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.75rem'
              }
            }}
          />
        </StyledListItem>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <StyledAppBar 
        position="fixed" 
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            onClick={handleMenuClick}
            size="small"
            sx={{ ml: 2 }}
          >
            <Avatar sx={{ 
              width: 40, 
              height: 40,
              background: theme.palette.primary.main,
            }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            TransitionComponent={Fade}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 180,
                borderRadius: 2,
                boxShadow: theme.shadows[8],
              }
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              الملف الشخصي
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              الإعدادات
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>

      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <StyledDrawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
            open
          >
            {drawer}
          </StyledDrawer>
        )}
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        }}
      >
        <Toolbar /> {/* Spacing for AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
