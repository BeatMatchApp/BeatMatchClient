import React, { useEffect, useMemo, useState } from "react";
import { Chip, TextField, Typography, Button } from "@mui/material";
import "./PreferencesPicker.css";
import { primaryColor } from "../../styles/consts";

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
    }, 200);
    return () => clearTimeout(timeout);
  }, [inputValue, onSearch]);

  const handleToggleSelect = (selectedItem: string): void => {
    if (selectedPreferences.includes(selectedItem)) {
      onChange(
        selectedPreferences.filter((item: string) => item !== selectedItem)
      );
    } else if (selectedPreferences.length < 3) {
      onChange([...selectedPreferences, selectedItem]);
    }
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
          sx={{ marginBottom: "16px" }}
        />
        <div className="items-list">
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
      </div>
      <div className="bottom-form">
        <div className="selected-preview">
          {selectedPreferences.length > 0 ? (
            <span>{selectedPreferences.join(", ")}</span>
          ) : (
            <span className="selected-placeholder">
              No {preferencesName} selected
            </span>
          )}
        </div>
        <Button
          variant="contained"
          disabled={!isMaxSelected}
          onClick={onMaxSelected}
          className="next-button"
        >
          keep going!
        </Button>
      </div>
    </>
  );
};

export default PreferencesPicker;
