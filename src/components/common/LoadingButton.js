import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const LoadingButton = ({
  loading = false,
  children,
  startIcon,
  loadingPosition = 'start',
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={loading || props.disabled}
      startIcon={
        loading && loadingPosition === 'start' ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          startIcon
        )
      }
      endIcon={
        loading && loadingPosition === 'end' ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          props.endIcon
        )
      }
    >
      {children}
    </Button>
  );
};

export default LoadingButton;
