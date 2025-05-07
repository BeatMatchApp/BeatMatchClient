import React, { useState } from "react";
import PreferencesPicker from "../preferencesPicker/preferencesPicker";
import { envConfig } from "../../config/config";
import { spotifyService } from "../../services/httpCommon";

interface Props {
  handleNextStep: (selectedArtists: string[]) => void;
}

const TopArtists: React.FC<Props> = ({ handleNextStep }) => {
  const [artistOptions, setArtistOptions] = useState<string[]>([]);

  const handleArtistSearch = async (query: string) => {
    if (!query) return;

    try {
      const response = await spotifyService.post(
        `${envConfig.SPOTIFY_SERVICE_URL}/general/getArtists`,
        {
          query: query,
        }
      );

      setArtistOptions(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

  const updateAtristsList = (artists: string[]): void => {
    setSelectedArtists(artists);
  };

  const onNextStep = (): void => {
    handleNextStep(selectedArtists);
  };

  return (
    <>
      <PreferencesPicker
        preferencesName="Artists"
        selectedPreferences={selectedArtists}
        options={artistOptions}
        onChange={updateAtristsList}
        onMaxSelected={onNextStep}
        onSearch={handleArtistSearch}
      />
    </>
  );
};

export default TopArtists;
