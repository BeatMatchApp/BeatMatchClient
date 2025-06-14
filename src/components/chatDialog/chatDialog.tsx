import * as React from 'react';
import {
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import ShinyCard from '../ShinyCard/ShinyCard';
import {
  StyledGradientChatIcon,
  StyledMenuButton,
  StyledTextArea,
} from '../styledComponents';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import theme from '../../styles/consts';

interface Props {
  requestText: string;
  setRequestText: (requestText: string) => void;
}

const ChatDialog: React.FC<Props> = ({ requestText, setRequestText }) => {
  const [dialogText, setDialogText] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveRequest = () => {
    setRequestText(dialogText);
    setIsDialogOpen(false);
  };

  const chatDialog = () => (
    <Dialog
      open={isDialogOpen}
      onClose={() => {
        setIsDialogOpen(false);
        setDialogText(requestText);
      }}
      PaperProps={{ sx: { borderRadius: '16px' } }}
    >
      <ShinyCard
        colors={['#8d92f6', '#a2dfd0']}
        sx={{ padding: 0, width: '100%', borderRadius: '16px' }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.customColors.textMain,
            textAlign: 'center',
            fontSize: '1.3rem',
            pt: 2,
          }}
        >
          Have a Request?
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          <DialogContentText
            sx={{
              color: (theme) => theme.palette.customColors.textSecondary,
              textAlign: 'center',
              fontSize: '0.95rem',
            }}
          >
            Add any special requests for the AI here — they’ll be considered
            when you click refresh!
          </DialogContentText>
          <StyledTextArea
            minRows={4}
            placeholder="Tell the AI exactly what you want!"
            onChange={(e) => setDialogText(e.target.value)}
            value={dialogText}
          />
        </DialogContent>

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '12px 16px 24px',
          }}
        >
          <StyledMenuButton onClick={handleSaveRequest}>
            Save Request
          </StyledMenuButton>
        </DialogActions>
      </ShinyCard>
    </Dialog>
  );

  const GradientDefs = () => (
    <svg width="0" height="0">
      <defs>
        <linearGradient id="chatGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={theme.palette.customColors.pink} />
          <stop
            offset="50%"
            stopColor={theme.palette.customColors.lightPurple}
          />
          <stop offset="100%" stopColor={theme.palette.customColors.medium} />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <>
      <GradientDefs />
      <IconButton onClick={() => setIsDialogOpen(true)}>
        <Badge
          invisible={!requestText.trim()}
          overlap="circular"
          badgeContent={
            <CheckCircleIcon
              sx={{
                width: 14,
                height: 14,
                color: theme.palette.customColors.pink,
                backgroundColor: 'white',
                borderRadius: '50%',
              }}
            />
          }
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <StyledGradientChatIcon />
        </Badge>
      </IconButton>

      {chatDialog()}
    </>
  );
};

export default ChatDialog;
