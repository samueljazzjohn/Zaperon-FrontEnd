import { Box, Typography } from '@material-ui/core';
import React, { Component } from 'react';

class ErrorPage extends Component {
  render() {
    return (
      <Box className='m-10'>
        <Typography variant='h3' component='h3'>Oops! Something went wrong.</Typography>
        <Typography className='mt-5' variant='h5' component='h5'>Please try again later.</Typography>
      </Box>
    );
  }
}

export default ErrorPage;