import React from 'react';
import {Chip } from '@mui/material';
import './PreferencesPicker.css';

interface Props {
  preference: string
}

const handleDelete = () => {
  console.info('You clicked the delete icon.');
};

const Preference: React.FC<Props> = ({
  preference,
}) => {

  return (
    <Chip 
    sx={{ margin: '0.5vh', backgroundColor: (theme) => theme.palette.customColors.lightPurple, color: 'white' }} 
    label={preference} 
    onDelete={handleDelete}/>
  );
};

export default Preference;
