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
} from '@mui/material';
import {
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  Store as StoreIcon,
  PhotoCamera as PhotoCameraIcon,
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
  const [profileImage, setProfileImage] = useState('/default-avatar.png');

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        الإعدادات
      </Typography>

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          تم حفظ التغييرات بنجاح
        </Alert>
      )}

      {/* Profile Settings */}
      <SettingsSection title="الملف الشخصي" icon={<EditIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ position: 'relative', mr: 3 }}>
            <Avatar
              src={profileImage}
              sx={{
                width: 100,
                height: 100,
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
            </Grid>
          </Box>
        </Box>
      </SettingsSection>

      {/* Store Settings */}
      <SettingsSection title="إعدادات المتجر" icon={<StoreIcon />}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="اسم المتجر" defaultValue="متجري الإلكتروني" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="رقم الهاتف" defaultValue="0555123456" />
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
          control={<Switch defaultChecked />}
          label="الفرنسية"
        />
      </SettingsSection>

      {/* Security */}
      <SettingsSection title="الأمان" icon={<SecurityIcon />}>
        <Grid container spacing={2}>
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button variant="outlined">إلغاء</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            bgcolor: theme.palette.primary.main,
            color: 'white',
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
          }}
        >
          حفظ التغييرات
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
