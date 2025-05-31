import React, { useState, ChangeEvent, SyntheticEvent } from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { getSongs } from '../../services/spotifyService';

interface Props {
  handleNextStep: (selectedSong: string) => void;
}

const TopSong: React.FC<Props> = ({ handleNextStep }) => {
  const [options, setOptions] = useState<string[]>([]);

  const handleInputChange = async (
    _event: ChangeEvent<object>,
    value: string
  ): Promise<void> => {
    if (!value) {
      setOptions([]);
      return;
    }

    try {
      const songs: string[] = await getSongs(value);

      setOptions(songs);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };
  const onSelectionChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string | null
  ): void => {
    if (value) {
      handleNextStep(value);
    }
  };

  return (
    <div className="picker-container">
      <Typography sx={{ color: (theme) => theme.palette.customColors.textMain }} variant="h6" gutterBottom>
        Pick Your Favorite Song!
      </Typography>
      <Autocomplete
        fullWidth
        options={options}
        getOptionLabel={(option) => option}
        filterOptions={(x) => x} // disable mui additional filtering
        onInputChange={handleInputChange}
        onChange={onSelectionChange}
        renderInput={(params) => (
          <TextField {...params} label="Search a Song" variant="outlined" />
        )}
      />
    </div>
  );
};

export default TopSong;
