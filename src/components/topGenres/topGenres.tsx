import React, { useState } from 'react';
import PreferencesPicker from '../preferencesPicker/preferencesPicker';
import { getGenres } from '../../services/spotifyService';
import { FormSteps } from '../../models/enums/FormSteps';

const DEFAULT_GENRES: string[] = [
  'pop',
  'rock',
  'jazz',
  'k-pop',
  'alternative',
];

interface Props {
  handleNextStep: (selectedsGenres: string[]) => void;
}

const TopGenres: React.FC<Props> = ({ handleNextStep }) => {
  const [genreOptions, setGenreOptions] = useState<string[]>(DEFAULT_GENRES);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const handleGenreSearch = async (query: string): Promise<void> => {
    if (!query) return;

    try {
      const genres: string[] = await getGenres(query);

      setGenreOptions(genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const updateGenresList = (genres: string[]): void => {
    setSelectedGenres(genres);
  };

  return (
    <PreferencesPicker
      preferencesName={FormSteps.GENRES}
      selectedPreferences={selectedGenres}
      options={genreOptions}
      onChange={updateGenresList}
      onMaxSelected={handleNextStep}
      onSearch={handleGenreSearch}
    />
  );
};

export default TopGenres;
