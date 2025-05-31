import { Typography, IconButton, Box } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
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

export const SelectableItem = styled(Box)<{ selected: boolean }>(({ selected }) => ({
  padding: '8px 16px',
  borderRadius: 16,
  whiteSpace: 'nowrap',
  background: selected
    ? '#42cea1'
    : 'linear-gradient(to right, #f5f5f5, #ddd)',
  color: selected ? 'white' : '#333',
  fontWeight: 500,
  cursor: 'pointer',
  userSelect: 'none',
  boxShadow: selected ? '0 0 6px rgba(0,0,0,0.2)' : 'none',
  transition: 'background 0.2s ease',
}));