import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useApp } from '../context/AppContext';
import { keyframes } from '@mui/system';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shine = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 ${alpha('#6366F1', 0.4)}; }
  70% { box-shadow: 0 0 0 10px ${alpha('#6366F1', 0)}; }
  100% { box-shadow: 0 0 0 0 ${alpha('#6366F1', 0)}; }
`;

const tiers = [
  {
    title: 'Starter',
    price: '2,999 DA',
    description: 'Perfect for new merchants starting their digital journey',
    features: [
      'Basic online store',
      'Up to 50 products',
      'Basic analytics',
      'Mobile-responsive design',
      'Email support',
    ],
    buttonText: 'Start Free Trial',
    buttonVariant: 'outlined',
  },
  {
    title: 'Professional',
    price: '7,999 DA',
    description: 'Everything you need to grow your business',
    features: [
      'Advanced online store',
      'Unlimited products',
      'Advanced analytics',
      'Custom domain',
      'Priority support',
      'Marketing tools',
      'Inventory management',
    ],
    buttonText: 'Get Started',
    buttonVariant: 'contained',
    popular: true,
  },
  {
    title: 'Enterprise',
    price: '14,999 DA',
    description: 'Custom solutions for large businesses',
    features: [
      'Custom online store',
      'Unlimited everything',
      'Advanced reporting',
      'Multiple domains',
      '24/7 support',
      'API access',
      'Custom integrations',
      'Dedicated account manager',
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'outlined',
  },
];

export default function Pricing() {
  const theme = useTheme();
  const { t } = useApp();

  return (
    <Box
      sx={{
        background: theme.palette.background.default,
        minHeight: '100vh',
        pt: 15,
        pb: 8,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: theme.palette.background.glow,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={8}>
          <Typography
            component="h1"
            variant="h1"
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              mb: 2,
            }}
          >
            {t('Simple, transparent pricing')}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              mb: 3,
              opacity: 0.8,
            }}
          >
            {t('Choose the perfect plan for your business. All plans include a 14-day free trial.')}
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="flex-start">
          {tiers.map((tier, index) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={6}
              md={4}
              sx={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: `rotateY(${index * 5}deg) translateZ(0)`,
                  animation: tier.popular
                    ? `${float} 6s ease-in-out infinite`
                    : 'none',
                  '&:hover': {
                    transform: 'rotateY(0deg) translateY(-8px)',
                    '&::before': {
                      opacity: 1,
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '24px',
                    padding: '2px',
                    background: tier.popular
                      ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
                      : 'linear-gradient(135deg, rgba(148, 163, 184, 0.1) 0%, rgba(148, 163, 184, 0.05) 100%)',
                    WebkitMask:
                      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                    opacity: tier.popular ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  },
                  ...(tier.popular && {
                    '&::after': {
                      content: '"Most Popular"',
                      position: 'absolute',
                      top: 0,
                      right: 24,
                      transform: 'translateY(-50%)',
                      background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '0 0 12px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      animation: `${pulse} 2s infinite`,
                    },
                  }),
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Typography
                    variant="h3"
                    component="h2"
                    gutterBottom
                    align="center"
                    sx={{
                      color: tier.popular ? 'primary.main' : 'text.primary',
                      fontWeight: 700,
                    }}
                  >
                    {t(tier.title)}
                  </Typography>
                  <Box textAlign="center" mb={3}>
                    <Typography
                      variant="h2"
                      color="text.primary"
                      sx={{
                        fontWeight: 800,
                        background: tier.popular
                          ? 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
                          : 'linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)',
                        backgroundSize: '200% 200%',
                        animation: `${shine} 3s linear infinite`,
                        backgroundClip: 'text',
                        textFillColor: 'transparent',
                      }}
                    >
                      {tier.price}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {t('per month')}
                    </Typography>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    paragraph
                    sx={{ mb: 4 }}
                  >
                    {t(tier.description)}
                  </Typography>
                  <List sx={{ mb: 4 }}>
                    {tier.features.map((feature) => (
                      <ListItem
                        key={feature}
                        sx={{
                          py: 1,
                          px: 0,
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleRoundedIcon
                            sx={{
                              color: tier.popular ? 'primary.main' : 'success.main',
                              filter: tier.popular
                                ? 'drop-shadow(0 0 6px rgba(99, 102, 241, 0.4))'
                                : 'none',
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={t(feature)}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: 'text.primary',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      color="primary"
                      size="large"
                      sx={{
                        height: 48,
                        ...(tier.popular && {
                          background: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
                          boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #818CF8 0%, #6366F1 100%)',
                            boxShadow: '0 12px 20px rgba(99, 102, 241, 0.4)',
                          },
                        }),
                      }}
                    >
                      {t(tier.buttonText)}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
