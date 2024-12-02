import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

function TestPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            مرحباً بكم في أميرة
          </Typography>
          <Typography variant="body1">
            منصة التجارة الإلكترونية الذكية للتجار الجزائريين
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

export default TestPage;
