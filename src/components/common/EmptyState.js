import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  image,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        px: 2,
      }}
    >
      {Icon && (
        <Icon
          sx={{
            fontSize: 64,
            color: 'text.secondary',
            mb: 2,
          }}
        />
      )}
      
      {image && (
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: '100%',
            maxWidth: 200,
            height: 'auto',
            mb: 2,
          }}
        />
      )}

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 400, mb: 4 }}
      >
        {description}
      </Typography>

      {actionText && onAction && (
        <Button
          variant="contained"
          size="large"
          onClick={onAction}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
