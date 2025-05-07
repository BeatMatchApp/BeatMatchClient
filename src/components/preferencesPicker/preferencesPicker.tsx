import React, { useEffect, useMemo, useState } from "react";
import { Chip, TextField, Typography, Button } from "@mui/material";
import "./PreferencesPicker.css";

interface Props {
  preferencesName: string;
  selectedPreferences: string[];
  options: string[];
  onChange: (newPreferences: string[]) => void;
  onMaxSelected: () => void;
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
  const [inputValue, setInputValue] = useState("");

  const isMaxSelected = useMemo(
    () => selectedPreferences.length === 3,
    [selectedPreferences]
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(inputValue);
    }, 300);
    return () => clearTimeout(timeout);
  }, [inputValue, onSearch]);

  const handleToggleSelect = (item: string) => {
    if (selectedPreferences.includes(item)) {
      onChange(selectedPreferences.filter((i) => i !== item));
    } else if (selectedPreferences.length < 3) {
      onChange([...selectedPreferences, item]);
    }
  };

  return (
    <div className="picker-container">
      <Typography variant="h6" gutterBottom>
        Pick Your Top {preferencesName}
      </Typography>

      <TextField
        label={`Search ${preferencesName}...`}
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />

      <div className="chip-list">
        {options.map((option) => {
          const isSelected = selectedPreferences.includes(option);
          return (
            <Chip
              key={option}
              label={option}
              onClick={() => handleToggleSelect(option)}
              color={isSelected ? "primary" : "default"}
              variant={isSelected ? "filled" : "outlined"}
              className="chip"
            />
          );
        })}
      </div>

      <div className="bottom-controls">
        <div className="selected-preview">
          {selectedPreferences.length > 0 ? (
            <span>{selectedPreferences.join(", ")}</span>
          ) : (
            <span className="placeholder">No artists selected</span>
          )}
        </div>
        <Button
          variant="contained"
          disabled={!isMaxSelected}
          onClick={onMaxSelected}
          className="next-button"
        >
          I'm good
        </Button>
      </div>
    </div>
  );
};

export default PreferencesPicker;
