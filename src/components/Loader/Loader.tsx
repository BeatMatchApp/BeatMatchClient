import * as React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const Loader: React.FC = () => {

  return (
    <Box className="center fullHeight">
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94aee9" />
            <stop offset="100%" stopColor="#a7efc7" />
          </linearGradient>
        </defs>
      </svg>
      {/* <CircularProgress size={80} sx={{ 'svg circle': { stroke: 'url(#my_gradient)' }}} /> */}
    </Box>
  )
};

export default Loader;
