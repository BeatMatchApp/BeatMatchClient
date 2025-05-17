import React, { useState, ChangeEvent, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { getSongs } from '../../services/spotifyService';

interface Props {
  handleNextStep: (selectedSong: string) => void;
}

const TopSong: React.FC<Props> = ({ handleNextStep }) => {
  const [_inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string | null>('');

  const handleInputChange = async (
    _event: ChangeEvent<{}>,
    value: string
  ): Promise<void> => {
    setInputValue(value);

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

  useEffect(() => {
    if (selectedSong) {
      handleNextStep(selectedSong);
    }
  }, [selectedSong]);

  return (
    <>
      <Autocomplete
        className="picker-container"
        fullWidth
        options={options}
        getOptionLabel={(option) => option}
        filterOptions={(x) => x} // disable mui additional filtering
        onInputChange={handleInputChange}
        onChange={(_, newValue) => setSelectedSong(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Search a Song" variant="outlined" />
        )}
      />
    </>
  );
};

export default TopSong;
