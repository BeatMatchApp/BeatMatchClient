import React, { useState } from 'react';
import PreferencesPicker from '../preferencesPicker/preferencesPicker';
import { getGenres } from '../../services/spotifyService';

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

  const handleGenreSearch = async (query: string): Promise<void> => {
    if (!query) return;

    try {
      const genres: string[] = await getGenres(query);

      setGenreOptions(genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const updateGenresList = (genres: string[]): void => {
    setSelectedGenres(genres);
  };

  const onNextStep = (): void => {
    handleNextStep(selectedGenres);
  };

  return (
    <PreferencesPicker
      preferencesName="Genres"
      selectedPreferences={selectedGenres}
      options={genreOptions}
      onChange={updateGenresList}
      onMaxSelected={onNextStep}
      onSearch={handleGenreSearch}
    />
  );
};

export default TopGenres;
