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
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        لوحة التحكم
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                تحليل المبيعات
              </Typography>
              <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">
                  الرسم البياني قيد التطوير
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
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
                      py: 1.5,
                      borderBottom: order < 3 ? 1 : 0,
                      borderColor: 'divider',
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      طلب #{1234 + order}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order === 1 ? 'قيد المعالجة' : order === 2 ? 'تم الشحن' : 'مكتمل'}
                    </Typography>
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
