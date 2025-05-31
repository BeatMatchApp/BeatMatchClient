import React, { useEffect, useMemo, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import './PreferencesPicker.css';
import { MAX_PREFERENCES_AMOUNT } from '../../shared/consts';
import Preference from './Preference';
import { StyledChip, StyledMenuButton } from '../styledComponents';

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
        <Typography sx={{ color: (theme) => theme.palette.customColors.textMain }}>
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
              <StyledChip
              key={option}
              label={option}
              onClick={() => handleToggleSelect(option)}
              variant={isSelected ? 'filled' : 'outlined'}
              className="chip"
              isSelected={isSelected}
            />            
            );
          })}
        </div>
      <div className="bottom-form">
        <div className="selected-preview">
          {selectedPreferences.length > 0 ? (
            selectedPreferences.map(preference => (
              <Preference key={preference} preference={preference} />
            ))
          ) : (
            <span className="selected-placeholder">
              No {preferencesName} selected
            </span>
          )}
        </div>
        <StyledMenuButton
          variant="contained"
          disabled={!isMaxSelected}
          onClick={handleMaxSelection}
          sx={{ marginTop: '3vh'}}
        >
          keep going!
        </StyledMenuButton>
      </div>
    </>
  );
};

export default PreferencesPicker;
