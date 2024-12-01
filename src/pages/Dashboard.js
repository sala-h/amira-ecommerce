import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  LinearProgress,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  People,
  AttachMoney,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, trend, trendValue, color }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Avatar sx={{ bgcolor: `${color}.light`, color: color }}>
            {icon}
          </Avatar>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </Box>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {trend === 'up' ? (
            <ArrowUpward sx={{ color: theme.palette.success.main, mr: 1 }} />
          ) : (
            <ArrowDownward sx={{ color: theme.palette.error.main, mr: 1 }} />
          )}
          <Typography
            variant="body2"
            color={trend === 'up' ? 'success.main' : 'error.main'}
          >
            {trendValue}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();

  const stats = [
    {
      title: 'إجمالي المبيعات',
      value: 'دج 125,430',
      icon: <AttachMoney />,
      trend: 'up',
      trendValue: '+15.3% من الشهر الماضي',
      color: theme.palette.primary.main,
    },
    {
      title: 'الطلبات الجديدة',
      value: '43',
      icon: <ShoppingCart />,
      trend: 'up',
      trendValue: '+12.5% من الأسبوع الماضي',
      color: theme.palette.secondary.main,
    },
    {
      title: 'العملاء النشطون',
      value: '892',
      icon: <People />,
      trend: 'down',
      trendValue: '-2.4% من الشهر الماضي',
      color: theme.palette.info.main,
    },
    {
      title: 'معدل النمو',
      value: '24.5%',
      icon: <TrendingUp />,
      trend: 'up',
      trendValue: '+4.2% من الربع الماضي',
      color: theme.palette.success.main,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        مرحباً بك في لوحة التحكم
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}

        {/* Activity Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                نشاط المبيعات
              </Typography>
              {/* Add Chart Component Here */}
              <Box sx={{ height: 300, bgcolor: 'background.default', borderRadius: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                أحدث الطلبات
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[1, 2, 3].map((order) => (
                  <Box
                    key={order}
                    sx={{
                      p: 2,
                      mb: 1,
                      bgcolor: 'background.default',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      طلب #{order}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      تم الطلب منذ {order} ساعة
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={order * 25}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
