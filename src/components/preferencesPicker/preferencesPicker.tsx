import React, { useEffect, useMemo, useState } from 'react';
import { Chip, TextField, Typography, Button } from '@mui/material';
import { primaryColor } from '../../styles/consts';
import { useDebounce } from 'use-debounce';
import './PreferencesPicker.css';
import { MAX_PREFERENCES_AMOUNT } from '../../shared/consts';
import { toast } from 'react-toastify';

interface Props {
  preferencesName: string;
  selectedPreferences: string[];
  options: string[];
  onChange: (newPreferences: string[]) => void;
  onMaxSelected: (selectedPreferences: string[]) => void;
  onSearch: (query: string) => void;
  editMode?: boolean;
}

const PreferencesPicker: React.FC<Props> = ({
  preferencesName,
  selectedPreferences,
  options,
  onChange,
  onMaxSelected,
  onSearch,
  editMode = false,
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

  const handleRemove = (selectedItem: string): void => {
    onChange(
      selectedPreferences.filter((item: string) => item !== selectedItem)
    );
  };

  const handleToggleSelect = (selectedItem: string): void => {
    if (selectedPreferences.includes(selectedItem)) {
      handleRemove(selectedItem);
    } else if (!isMaxSelected) {
      onChange([...selectedPreferences, selectedItem]);
    } else if (isMaxSelected) {
      toast.info(
        `You can only select ${MAX_PREFERENCES_AMOUNT} ${preferencesName}.
          Please remove one before adding another.`
      );
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
            selectedPreferences.map((item) => (
              <div className="chip" key={item}>
                <span className="chip-label">{item}</span>
                <button
                  className="chip-remove"
                  onClick={() => handleRemove(item)}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <span className="selected-placeholder">
              No {preferencesName} selected
            </span>
          )}
        </div>
        {!editMode && (
          <Button
            variant="contained"
            disabled={!isMaxSelected}
            onClick={handleMaxSelection}
            className="next-button"
          >
            keep going!
          </Button>
        )}
      </div>
    </>
  );
};

export default PreferencesPicker;
