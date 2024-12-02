import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

const ProductCard = ({
  title,
  price,
  oldPrice,
  image,
  rating,
  inStock,
  discount,
  onAddToCart,
  onAddToWishlist,
  onShare,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease-in-out',
        },
      }}
    >
      {discount && (
        <Chip
          label={`-${discount}%`}
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1,
          }}
        />
      )}

      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{ objectFit: 'contain', p: 2 }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="h6"
          component="h2"
          sx={{
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
            {price} دج
          </Typography>
          {oldPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: 'line-through', mr: 1 }}
            >
              {oldPrice} دج
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                style={{
                  color: index < rating ? theme.palette.warning.main : theme.palette.grey[300],
                }}
              >
                ★
              </span>
            ))}
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              ({rating})
            </Typography>
          </Box>
          <Chip
            label={inStock ? 'متوفر' : 'نفذ المخزون'}
            color={inStock ? 'success' : 'error'}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
          <IconButton onClick={onAddToCart} color="primary" size="large">
            <CartIcon />
          </IconButton>
          <IconButton onClick={onAddToWishlist} color="error" size="large">
            <FavoriteIcon />
          </IconButton>
          <IconButton onClick={onShare} color="info" size="large">
            <ShareIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
