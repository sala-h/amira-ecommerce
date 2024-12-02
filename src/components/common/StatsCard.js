import React from 'react';
import { Box, Card, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

const StatsCard = ({ title, value, icon: Icon, trend, color = 'primary' }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease-in-out',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 1.5,
          bgcolor: alpha(theme.palette[color].main, 0.1),
          borderBottomLeftRadius: theme.shape.borderRadius,
        }}
      >
        <Icon sx={{ color: theme.palette[color].main }} />
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary' }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ mb: 1, color: theme.palette[color].main }}>
          {value}
        </Typography>
        {trend && (
          <Typography
            variant="body2"
            sx={{
              color: trend > 0 ? 'success.main' : 'error.main',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% مقارنة بالشهر الماضي
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default StatsCard;
