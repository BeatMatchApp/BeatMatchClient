import React, { useEffect, useState } from 'react';
import PreferencesPicker from '../preferencesPicker/preferencesPicker';
import { getArtists } from '../../services/spotifyService';
import { FormSteps } from '../../models/enums/FormSteps';

interface Props {
  selectedArtists: string[];
  setSelectedArtists: (selectedArtists: string[]) => void;
  handleNextStep?: (selectedArtists: string[]) => void;
  artists?: string[];
}

const TopArtists: React.FC<Props> = ({
  artists,
  selectedArtists,
  setSelectedArtists,
  handleNextStep = () => {},
}) => {
  const [artistOptions, setArtistOptions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedArtists(artists ?? []);
  }, [artists]);

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

  return (
    <PreferencesPicker
      preferencesName={FormSteps.ARTISTS}
      selectedPreferences={selectedArtists}
      options={artistOptions}
      onChange={updateAtristsList}
      onMaxSelected={onNextStep}
      onSearch={handleArtistSearch}
      editMode={!!artists}
    />
  );
};

export default TopArtists;
