import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Box, Divider, TextField, Typography, IconButton } from '@mui/material';
import { useDebounce } from 'use-debounce';
import './PreferencesPicker.css';
import { MAX_PREFERENCES_AMOUNT } from '../../shared/consts';
import Preference from './Preference';
import { StyledChip, StyledMenuButton } from '../styledComponents';
import { toast } from 'react-toastify';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

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
  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);
  const [isOptionsOverflowing, setIsOptionsOverflowing] = useState(false);
  const [animateOptions, setAnimateOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnimateOptions(true);
    const timeoutId = setTimeout(() => setAnimateOptions(false), 300); // match your CSS duration
    return () => clearTimeout(timeoutId);
  }, [options]);

  useEffect(() => {
    const checkOverflow = () => {
      const currentOptionsList = optionsRef.current;
      if (currentOptionsList) {
        setIsOptionsOverflowing(
          currentOptionsList.scrollHeight > currentOptionsList.clientHeight
        );
      }
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [options.length]);

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
      <Typography
        variant="body2"
        sx={{ color: (theme) => theme.palette.customColors.textSecondary }}
      >
        Pick Your Top {MAX_PREFERENCES_AMOUNT} {preferencesName}
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
      <Box className="items-container">
        <Box
          className={`items-list ${animateOptions ? 'animate-options' : ''}`}
          ref={optionsRef}
          style={{
            maxHeight: isOptionsExpanded ? 'none' : '80px',
            overflowY: isOptionsExpanded ? 'visible' : 'hidden',
          }}
        >
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
        </Box>
        {isOptionsOverflowing && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton
              size="small"
              onClick={() => setIsOptionsExpanded((prev) => !prev)}
              sx={{
                alignSelf: 'flex-end',
                marginTop: '4px',
                outline: 'none',
                boxShadow: 'none',
                '&:focus:not(:focus-visible)': {
                  outline: 'none',
                  boxShadow: 'none',
                },
              }}
            >
              {isOptionsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
        )}
      </Box>

      {selectedPreferences.length > 0 && options.length > 0 && (
        <Divider sx={{ margin: '1vh' }} />
      )}
      <Box className="bottom-form">
        <Box className="selected-preview">
          {selectedPreferences.length > 0 ? (
            <Box className="selected-preview-inner">
              {selectedPreferences.map((preference) => (
                <Preference
                  key={preference}
                  preference={preference}
                  handleDelete={() => handleRemove(preference)}
                />
              ))}
            </Box>
          ) : (
            <Box className="selected-placeholder">
              No {preferencesName} selected
            </Box>
          )}
        </Box>

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
      </Box>
    </>
  );
};

export default PreferencesPicker;
