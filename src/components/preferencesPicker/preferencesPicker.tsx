import React, { useEffect, useMemo, useState } from 'react';
import { Divider, TextField, Typography } from '@mui/material';
import { useDebounce } from 'use-debounce';
import './PreferencesPicker.css';
import { MAX_PREFERENCES_AMOUNT } from '../../shared/consts';
import Preference from './Preference';
import { StyledChip, StyledMenuButton } from '../styledComponents';
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
      <Typography
        sx={{ color: (theme) => theme.palette.customColors.textMain }}
      >
        Pick Your Favorite {preferencesName}!
      </Typography>
      <TextField
        label={`Search ${preferencesName}...`}
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        className="search"
        sx={{ marginBottom: '2vh', marginTop: '2vh' }}
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
            <>
              <Divider sx={{ margin: '1vh' }} />
              {selectedPreferences.map((preference) => (
                <Preference
                  key={preference}
                  preference={preference}
                  handleDelete={() => handleRemove(preference)}
                />
              ))}
            </>
          ) : (
            <span className="selected-placeholder">
              No {preferencesName} selected
            </span>
          )}
        </div>

        {!editMode && (
          <StyledMenuButton
            variant="contained"
            disabled={!isMaxSelected}
            onClick={handleMaxSelection}
            sx={{ marginTop: '3vh' }}
          >
            keep going!
          </StyledMenuButton>
        )}
      </div>
    </>
  );
};

export default PreferencesPicker;
