import { Typography, IconButton } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2vh 0;
  width: 100%;
`;

export const Title = styled(Typography)`
  margin-bottom: 12px !important;
  font-weight: bold;
`;

export const ScrollArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2vh;
`;

export const ScrollContent = styled.div`
  display: flex;
  overflow-x: hidden;
  scroll-behavior: smooth;
  gap: 8px;
`;

export const ScrollButton = styled(IconButton)<{ side: 'left' | 'right' }>`
  ${(props) =>
    props.side === 'left'
      ? 'margin-right: 12px !important;'
      : 'margin-left: 12px !important;'}
`;