import React from 'react';
import { Chip } from '@mui/material';
import './PreferencesPicker.css';

interface Props {
  preference: string;
  handleDelete: (selectedItem: string) => void;
}

const Preference: React.FC<Props> = ({ preference, handleDelete }) => {
  return (
    <Chip
      sx={{
        backgroundColor: (theme) => theme.palette.customColors.lightPurple,
        color: 'white',
      }}
      label={preference}
      onDelete={handleDelete}
    />
  );
};

export default Preference;
