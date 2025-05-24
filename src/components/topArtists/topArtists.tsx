import React, { useState } from 'react';
import PreferencesPicker from '../preferencesPicker/preferencesPicker';
import { getArtists } from '../../services/spotifyService';
import { FormSteps } from '../../models/enums/FormSteps';

interface Props {
  handleNextStep: (selectedArtists: string[]) => void;
}

const TopArtists: React.FC<Props> = ({ handleNextStep }) => {
  const [artistOptions, setArtistOptions] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

  const handleArtistSearch = async (query: string): Promise<void> => {
    if (!query) return;

    try {
      const artists: string[] = await getArtists(query);

      setArtistOptions(artists);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const updateAtristsList = (artists: string[]): void => {
    setSelectedArtists(artists);
  };

  const onNextStep = (): void => {
    handleNextStep(selectedArtists);
  };

  return (
    <PreferencesPicker
      preferencesName={FormSteps.ARTISTS}
      selectedPreferences={selectedArtists}
      options={artistOptions}
      onChange={updateAtristsList}
      onMaxSelected={handleNextStep}
      onSearch={handleArtistSearch}
    />
  );
};

export default TopArtists;
