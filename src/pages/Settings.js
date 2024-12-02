import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Grid,
  Avatar,
  IconButton,
  useTheme,
  Alert,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  Store as StoreIcon,
  PhotoCamera as PhotoCameraIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';

const SettingsSection = ({ title, icon, children }) => {
  const theme = useTheme();
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: `${theme.palette.primary.main}20`,
              color: theme.palette.primary.main,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  );
};

const Settings = () => {
  const theme = useTheme();
  const [saved, setSaved] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const wilayas = [
    'الجزائر العاصمة',
    'وهران',
    'قسنطينة',
    'عنابة',
    'سطيف',
    'تلمسان',
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        الإعدادات
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          تم حفظ التغييرات بنجاح
        </Alert>
      )}

      {/* Profile Settings */}
      <SettingsSection title="الملف الشخصي" icon={<EditIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'start', mb: 3 }}>
          <Box sx={{ position: 'relative', mr: 3 }}>
            <Avatar
              src={profileImage}
              sx={{
                width: 120,
                height: 120,
                border: `2px solid ${theme.palette.primary.main}`,
              }}
            />
            <IconButton
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
              size="small"
            >
              <PhotoCameraIcon sx={{ color: 'white' }} />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="الاسم" defaultValue="محمد أمين" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="البريد الإلكتروني" defaultValue="example@email.com" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="رقم الهاتف" defaultValue="0555123456" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="الولاية"
                  defaultValue="الجزائر العاصمة"
                >
                  {wilayas.map((wilaya) => (
                    <MenuItem key={wilaya} value={wilaya}>
                      {wilaya}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </SettingsSection>

      {/* Store Settings */}
      <SettingsSection title="إعدادات المتجر" icon={<StoreIcon />}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="اسم المتجر" defaultValue="متجري الإلكتروني" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="رقم السجل التجاري" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="وصف المتجر"
              defaultValue="متجر إلكتروني متخصص في بيع المنتجات التكنولوجية"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="رابط صفحة الفيسبوك" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="رابط صفحة الانستغرام" />
          </Grid>
        </Grid>
      </SettingsSection>

      {/* Shipping Settings */}
      <SettingsSection title="إعدادات الشحن" icon={<ShippingIcon />}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="خدمة التوصيل"
              defaultValue="يلو"
            >
              <MenuItem value="يلو">يلو</MenuItem>
              <MenuItem value="بريد الجزائر">بريد الجزائر</MenuItem>
              <MenuItem value="توصيل خاص">توصيل خاص</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="تكلفة التوصيل الافتراضية (دج)"
              defaultValue="600"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="السماح بالدفع عند الاستلام"
            />
          </Grid>
        </Grid>
      </SettingsSection>

      {/* Payment Settings */}
      <SettingsSection title="إعدادات الدفع" icon={<PaymentIcon />}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="رقم حساب CCP" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="رقم حساب بريدي موب" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="تفعيل الدفع الإلكتروني"
            />
          </Grid>
        </Grid>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection title="الإشعارات" icon={<NotificationsIcon />}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="إشعارات الطلبات الجديدة"
        />
        <Divider sx={{ my: 2 }} />
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="إشعارات الرسائل"
        />
        <Divider sx={{ my: 2 }} />
        <FormControlLabel
          control={<Switch />}
          label="إشعارات التحديثات"
        />
      </SettingsSection>

      {/* Language */}
      <SettingsSection title="اللغة" icon={<LanguageIcon />}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="العربية"
        />
        <Divider sx={{ my: 2 }} />
        <FormControlLabel
          control={<Switch />}
          label="الفرنسية"
        />
      </SettingsSection>

      {/* Security */}
      <SettingsSection title="الأمان" icon={<SecurityIcon />}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="password"
              label="كلمة المرور الحالية"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="password"
              label="كلمة المرور الجديدة"
            />
          </Grid>
        </Grid>
      </SettingsSection>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4, mb: 4 }}>
        <Button variant="outlined" size="large">
          إلغاء
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
        >
          حفظ التغييرات
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
