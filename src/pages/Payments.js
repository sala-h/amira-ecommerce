import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Payments() {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder data - will be replaced with real data from backend
  const payments = [
    {
      id: 'ORD001',
      date: '2024-03-01',
      amount: 5600,
      customer: 'Ahmed Benali',
      status: 'collected',
      deliveryAgent: 'Karim Hadj',
      wilaya: 'Algiers'
    },
    {
      id: 'ORD002',
      date: '2024-03-01',
      amount: 3200,
      customer: 'Sara Mansouri',
      status: 'pending',
      deliveryAgent: 'Mohamed Saidi',
      wilaya: 'Oran'
    },
    {
      id: 'ORD003',
      date: '2024-03-01',
      amount: 4800,
      customer: 'Youcef Kaci',
      status: 'failed',
      deliveryAgent: 'Ali Meziane',
      wilaya: 'Constantine'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'collected':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatAmount = (amount) => {
    return `${amount.toLocaleString()} DZD`;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs>
            <Typography variant="h4" component="h1" gutterBottom>
              Payment Tracking
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search by Order ID or Customer"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary">
                Export Report
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                Reconcile Payments
              </Button>
            </Grid>
          </Grid>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Delivery Agent</TableCell>
                <TableCell>Wilaya</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{formatAmount(payment.amount)}</TableCell>
                  <TableCell>{payment.customer}</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status}
                      color={getStatusColor(payment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{payment.deliveryAgent}</TableCell>
                  <TableCell>{payment.wilaya}</TableCell>
                  <TableCell>
                    <Button size="small" color="primary">
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* TODO: Add pagination */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Showing 3 of 156 payments
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Payments;
