import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';

function DeliveryOptimization() {
  const [deliveryPoints, setDeliveryPoints] = useState([]);
  const [newPoint, setNewPoint] = useState({ address: '', latitude: '', longitude: '' });
  const [loading, setLoading] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState(null);

  const handleAddPoint = () => {
    if (newPoint.address && newPoint.latitude && newPoint.longitude) {
      setDeliveryPoints([...deliveryPoints, newPoint]);
      setNewPoint({ address: '', latitude: '', longitude: '' });
    }
  };

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/delivery/optimize-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ delivery_points: deliveryPoints }),
      });

      const data = await response.json();
      if (data.success) {
        setOptimizedRoute(data.optimized_route);
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
        <Typography variant="h5" component="h1" gutterBottom>
          Delivery Route Optimization
        </Typography>
        
        <Box component="form" sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                value={newPoint.address}
                onChange={(e) => setNewPoint({ ...newPoint, address: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Latitude"
                variant="outlined"
                type="number"
                value={newPoint.latitude}
                onChange={(e) => setNewPoint({ ...newPoint, latitude: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Longitude"
                variant="outlined"
                type="number"
                value={newPoint.longitude}
                onChange={(e) => setNewPoint({ ...newPoint, longitude: e.target.value })}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mb: 2 }}
            onClick={handleAddPoint}
          >
            Add Delivery Point
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={handleOptimize}
            disabled={loading || deliveryPoints.length === 0}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Optimize Route'
            )}
          </Button>
        </Box>

        {deliveryPoints.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Delivery Points
            </Typography>
            <List>
              {deliveryPoints.map((point, index) => (
                <ListItem key={index} sx={{ mb: 1 }}>
                  <ListItemText
                    primary={point.address}
                    secondary={`Lat: ${point.latitude}, Long: ${point.longitude}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {optimizedRoute && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Optimized Route
            </Typography>
            <List>
              {optimizedRoute.map((point, index) => (
                <ListItem key={index} sx={{ mb: 1 }}>
                  <ListItemText
                    primary={`Stop ${index + 1}: ${point.address}`}
                    secondary={`Lat: ${point.latitude}, Long: ${point.longitude}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default DeliveryOptimization;
