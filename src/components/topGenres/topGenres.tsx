import React, { useEffect, useState } from 'react';
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
  selectedGenres: string[];
  setSelectedGenres: (selectedsGenres: string[]) => void;
  handleNextStep?: () => void;
  genres?: string[];
}

const TopGenres: React.FC<Props> = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  handleNextStep = () => {},
}) => {
  const [genreOptions, setGenreOptions] = useState<string[]>(DEFAULT_GENRES);

  useEffect(() => {
    setSelectedGenres(genres ?? []);
  }, [genres]);

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
      editMode={!!genres}
    />
  );
};

export default TopGenres;
