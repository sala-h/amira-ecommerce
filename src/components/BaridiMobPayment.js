import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
  TextField,
  Alert,
  Fade,
  Slide,
  IconButton,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { baridimobService } from '../services/baridimobService';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 20,
    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
}));

const GlassCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  padding: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: 'rgba(255, 255, 255, 0.9)',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '12px 24px',
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 600,
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const StepIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: 'white',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: 30,
  },
}));

const BaridiMobPayment = ({ open, onClose, amount, planName, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState('PHONE');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (step === 'PROCESSING') {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 800);
    }
    return () => clearInterval(timer);
  }, [step]);

  const handlePhoneSubmit = async () => {
    if (!phoneNumber.match(/^(05|06|07)\d{8}$/)) {
      setError('الرجاء إدخال رقم هاتف صحيح | Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderId = `ORDER_${Date.now()}`;
      const qrCodeUrl = await baridimobService.generateQRCode(amount, orderId);
      setQrCode(qrCodeUrl);
      setStep('QR');
    } catch (err) {
      setError('حدث خطأ في إنشاء رمز QR | Error generating QR code');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentVerification = async () => {
    setStep('PROCESSING');
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep('SUCCESS');
      onSuccess();
    } catch (err) {
      setError('فشل التحقق من الدفع | Payment verification failed');
      setStep('QR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'up' }}
    >
      <DialogTitle sx={{ 
        textAlign: 'center',
        position: 'relative',
        pb: 0
      }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Fade in={true} timeout={1000}>
          <Box>
            <Typography variant="h5" component="div" fontWeight="600" mb={1}>
              الدفع عبر بريدي موب
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              BaridiMob Payment
            </Typography>
          </Box>
        </Fade>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          {error && (
            <Fade in={true}>
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    fontSize: '1.5rem'
                  }
                }}
              >
                {error}
              </Alert>
            </Fade>
          )}

          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            {planName} - {amount} DA
          </Typography>

          {step === 'PHONE' && (
            <Fade in={true}>
              <GlassCard>
                <StepIcon>
                  <PhoneIphoneIcon />
                </StepIcon>
                <StyledTextField
                  fullWidth
                  label="رقم الهاتف | Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="05XXXXXXXX"
                  disabled={loading}
                  sx={{ mb: 2 }}
                />
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  سيتم استخدام رقم هاتفك لإرسال إشعار الدفع
                  <br />
                  Your phone number will be used to send the payment notification
                </Typography>
              </GlassCard>
            </Fade>
          )}

          {step === 'QR' && qrCode && (
            <Fade in={true}>
              <GlassCard>
                <StepIcon>
                  <QrCodeIcon />
                </StepIcon>
                <Box sx={{ 
                  p: 2, 
                  background: 'white',
                  borderRadius: 4,
                  display: 'inline-block',
                  mb: 2
                }}>
                  <QRCodeSVG 
                    value={qrCode} 
                    size={200}
                    level="H"
                    includeMargin={true}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </Box>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  امسح رمز QR باستخدام تطبيق بريدي موب
                  <br />
                  Scan QR code using BaridiMob app
                </Typography>
              </GlassCard>
            </Fade>
          )}

          {step === 'PROCESSING' && (
            <Fade in={true}>
              <GlassCard>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                  <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={80}
                    thickness={4}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" component="div" color="text.secondary">
                      {`${Math.round(progress)}%`}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  جاري التحقق من الدفع...
                  <br />
                  Verifying payment...
                </Typography>
              </GlassCard>
            </Fade>
          )}

          {step === 'SUCCESS' && (
            <Fade in={true}>
              <GlassCard>
                <StepIcon sx={{ 
                  background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                  mb: 3
                }}>
                  <CheckCircleIcon />
                </StepIcon>
                <Typography variant="h6" color="success.main" gutterBottom>
                  تم الدفع بنجاح! 🎉
                  <br />
                  Payment Successful!
                </Typography>
              </GlassCard>
            </Fade>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, justifyContent: 'center' }}>
        {step === 'PHONE' && (
          <StyledButton
            variant="contained"
            onClick={handlePhoneSubmit}
            disabled={loading || !phoneNumber}
            sx={{ minWidth: 200 }}
          >
            {loading ? <CircularProgress size={24} /> : 'متابعة | Continue'}
          </StyledButton>
        )}

        {step === 'QR' && (
          <StyledButton
            variant="contained"
            onClick={handlePaymentVerification}
            disabled={loading}
            sx={{ minWidth: 200 }}
          >
            {loading ? <CircularProgress size={24} /> : 'تأكيد الدفع | Verify Payment'}
          </StyledButton>
        )}

        {step === 'SUCCESS' && (
          <StyledButton
            variant="contained"
            onClick={onClose}
            color="success"
            sx={{ minWidth: 200 }}
          >
            إغلاق | Close
          </StyledButton>
        )}
      </DialogActions>
    </StyledDialog>
  );
};

export default BaridiMobPayment;
