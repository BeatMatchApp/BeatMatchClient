import React from 'react';
import { Box, Card } from '@mui/material';

type ShinyCardProps = {
  children: React.ReactNode;
  colors: string[];
  small?: boolean;
};

const ShinyCard: React.FC<ShinyCardProps> = ({ children, colors, small }) => {
  return (
    <Card
      className="shinyCard"
      sx={{
        position: 'relative',
        borderRadius: '16px',
        padding: small ? 1 : 2,
        backgroundColor: 'white',
        overflow: 'hidden',
        zIndex: 1,
        width: { xs: '80vw', sm: '40vw' },

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '16px',
          padding: '4px',
          background: `linear-gradient(
            130deg,
            #ffffff,
            ${colors[0]},
            ${colors[1]},
            #ffffff,
            ${colors[0]},
            ${colors[1]},
            #ffffff
          )`,
          backgroundSize: '400% 400%',
          animation: 'smoothGlowBorder 8s ease-in-out infinite',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          pointerEvents: 'none',
          zIndex: -1,
          filter: 'blur(5px)',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>{children}</Box>

      <style>
        {`
          @keyframes smoothGlowBorder {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </Card>
  );
};

export default ShinyCard;
