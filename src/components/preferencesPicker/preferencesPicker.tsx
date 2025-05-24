import React, { useEffect, useMemo, useState } from 'react';
import { Chip, TextField, Typography, Button } from '@mui/material';
import { primaryColor } from '../../styles/consts';
import { useDebounce } from 'use-debounce';
import './PreferencesPicker.css';
import { MAX_PREFERENCES_AMOUNT } from '../../shared/consts';

interface Props {
  preferencesName: string;
  selectedPreferences: string[];
  options: string[];
  onChange: (newPreferences: string[]) => void;
  onMaxSelected: (selectedPreferences: string[]) => void;
  onSearch: (query: string) => void;
}

const PreferencesPicker: React.FC<Props> = ({
  preferencesName,
  selectedPreferences,
  options,
  onChange,
  onMaxSelected,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState('');

  const isMaxSelected = useMemo(
    () => selectedPreferences.length === MAX_PREFERENCES_AMOUNT,
    [selectedPreferences]
  );

  const [debouncedValue] = useDebounce(inputValue, 300);
  useEffect(() => {
    if (debouncedValue) onSearch(debouncedValue);
  }, [debouncedValue]);

  const handleToggleSelect = (selectedItem: string): void => {
    if (selectedPreferences.includes(selectedItem)) {
      onChange(
        selectedPreferences.filter((item: string) => item !== selectedItem)
      );
    } else if (!isMaxSelected) {
      onChange([...selectedPreferences, selectedItem]);
    }
  };

  const handleMaxSelection = (): void => {
    onMaxSelected(selectedPreferences);
  };

  return (
    <>
      <div className="picker-container">
        <Typography color={primaryColor} variant="h6" gutterBottom>
          Pick Your Favorite {preferencesName}!
        </Typography>
        <TextField
          label={`Search ${preferencesName}...`}
          variant="outlined"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          className="search"
          sx={{ marginBottom: '16px' }}
        />
        <div className="items-list">
          {options.map((option) => {
            const isSelected = selectedPreferences.includes(option);

            return (
              <Chip
                key={option}
                label={option}
                onClick={() => handleToggleSelect(option)}
                color={isSelected ? 'primary' : 'default'}
                variant={isSelected ? 'filled' : 'outlined'}
                className="chip"
              />
            );
          })}
        </div>
      </div>
      <div className="bottom-form">
        <div className="selected-preview">
          {selectedPreferences.length > 0 ? (
            <span>{selectedPreferences.join(', ')}</span>
          ) : (
            <span className="selected-placeholder">
              No {preferencesName} selected
            </span>
          )}
        </div>
        <Button
          variant="contained"
          disabled={!isMaxSelected}
          onClick={handleMaxSelection}
          className="next-button"
        >
          keep going!
        </Button>
      </div>
    </>
  );
};

export default PreferencesPicker;
