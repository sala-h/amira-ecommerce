import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  Timeline,
  TrendingUp,
  LocationOn,
  Category,
} from '@mui/icons-material';

const AnalyticCard = ({ title, value, subtitle, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: '50%',
            bgcolor: `${color}.light`,
            color: color,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    </CardContent>
  </Card>
);

const Analytics = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = React.useState('week');

  const analyticsData = [
    {
      title: 'إجمالي المبيعات',
      value: 'دج 245,680',
      subtitle: '+12.5% من الفترة السابقة',
      icon: <TrendingUp />,
      color: theme.palette.primary.main,
    },
    {
      title: 'متوسط قيمة الطلب',
      value: 'دج 3,450',
      subtitle: '+5.2% من الفترة السابقة',
      icon: <Timeline />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'أفضل المناطق',
      value: 'الجزائر العاصمة',
      subtitle: '32% من إجمالي المبيعات',
      icon: <LocationOn />,
      color: theme.palette.info.main,
    },
    {
      title: 'أفضل الفئات',
      value: 'الإلكترونيات',
      subtitle: '28% من إجمالي المبيعات',
      icon: <Category />,
      color: theme.palette.success.main,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">التحليلات</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>الفترة الزمنية</InputLabel>
          <Select
            value={timeRange}
            label="الفترة الزمنية"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="day">اليوم</MenuItem>
            <MenuItem value="week">الأسبوع</MenuItem>
            <MenuItem value="month">الشهر</MenuItem>
            <MenuItem value="year">السنة</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {analyticsData.map((data, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <AnalyticCard {...data} />
          </Grid>
        ))}

        {/* Sales Trend Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                اتجاه المبيعات
              </Typography>
              <Box sx={{ height: 400, bgcolor: 'background.default', borderRadius: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Top Products */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                أفضل المنتجات
              </Typography>
              <Box sx={{ mt: 2 }}>
                {[1, 2, 3, 4, 5].map((product) => (
                  <Box
                    key={product}
                    sx={{
                      p: 2,
                      mb: 1,
                      bgcolor: 'background.default',
                      borderRadius: 1,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">
                        المنتج {product}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product * 12} وحدة مباعة
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" color="primary">
                      دج {product * 1250}
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

export default Analytics;
