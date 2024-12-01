import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Box
} from '@mui/material';

function ProductResearch() {
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/research/market-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ product_name: productName }),
      });

      const data = await response.json();
      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product Research Assistant
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mb: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Analyze Market'
            )}
          </Button>
        </Box>

        {analysis && (
          <Paper elevation={1} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Market Analysis Results
            </Typography>
            <Typography variant="body1" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
              {analysis}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}

export default ProductResearch;
