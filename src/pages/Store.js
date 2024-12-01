import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const ProductCard = ({ product }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" component="div" gutterBottom>
            {product.name}
          </Typography>
          <IconButton size="small" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <EditIcon sx={{ mr: 1 }} /> تعديل
            </MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
              <DeleteIcon sx={{ mr: 1 }} /> حذف
            </MenuItem>
          </Menu>
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.description}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            دج {product.price.toLocaleString()}
          </Typography>
          <Chip
            label={`${product.stock} في المخزون`}
            color={product.stock > 10 ? 'success' : 'warning'}
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const Store = () => {
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'هاتف ذكي',
      description: 'هاتف ذكي حديث مع كاميرا عالية الدقة وبطارية طويلة العمر',
      price: 45000,
      stock: 15,
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      name: 'حاسوب محمول',
      description: 'حاسوب محمول خفيف الوزن مع معالج قوي وشاشة عالية الدقة',
      price: 120000,
      stock: 8,
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      name: 'سماعات لاسلكية',
      description: 'سماعات لاسلكية مع جودة صوت عالية وبطارية طويلة العمر',
      price: 8000,
      stock: 25,
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 4,
      name: 'ساعة ذكية',
      description: 'ساعة ذكية مع تتبع اللياقة البدنية وإشعارات الهاتف',
      price: 15000,
      stock: 12,
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">المتجر</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          إضافة منتج
        </Button>
      </Box>

      {/* Search and Filter */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="البحث عن المنتجات..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 500 }}
        />
        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          onClick={handleFilterClick}
        >
          تصفية
        </Button>
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
        >
          <MenuItem onClick={handleFilterClose}>السعر: من الأقل إلى الأعلى</MenuItem>
          <MenuItem onClick={handleFilterClose}>السعر: من الأعلى إلى الأقل</MenuItem>
          <MenuItem onClick={handleFilterClose}>المخزون: من الأقل إلى الأعلى</MenuItem>
          <MenuItem onClick={handleFilterClose}>المخزون: من الأعلى إلى الأقل</MenuItem>
        </Menu>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Store;
