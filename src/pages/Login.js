import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

function Login() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Login submitted:', formData);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Left side - Login Form */}
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 1,
            }}
          >
            Welcome back!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Enter your credentials to access your account
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: '#fff',
            border: '1px solid',
            borderColor: theme.palette.divider,
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 3, textAlign: 'right' }}>
              <Link
                component={RouterLink}
                to="/forgot-password"
                color="primary"
                underline="hover"
                sx={{ fontWeight: 500 }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              sx={{
                height: 48,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Sign In
            </Button>
          </form>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link
              component={RouterLink}
              to="/register"
              color="primary"
              underline="hover"
              sx={{ fontWeight: 500 }}
            >
              Sign up here
            </Link>
          </Typography>
        </Box>
      </Container>

      {/* Right side - Image and Text */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: theme.palette.primary.main,
          color: '#fff',
          p: 8,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 100%)',
          },
        }}
      >
        <Box sx={{ position: 'relative', maxWidth: 480, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
            Manage Your Algerian E-commerce Business
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 400 }}>
            Streamline your operations, boost sales, and optimize deliveries with our AI-powered platform
          </Typography>
          <Box
            component="img"
            src="/assets/ecommerce-illustration.svg"
            alt="E-commerce illustration"
            sx={{
              width: '100%',
              maxWidth: 360,
              height: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
