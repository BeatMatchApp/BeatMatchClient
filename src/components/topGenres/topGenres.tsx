import React, { useState } from "react";
import PreferencesPicker from "../preferencesPicker/preferencesPicker";
import { envConfig } from "../../config/config";
import { spotifyService } from "../../services/httpCommon";

interface Props {
  handleNextStep: (selectedsGenres: string[]) => void;
}

const TopGenres: React.FC<Props> = ({ handleNextStep }) => {
  const [genreOptions, setGenreOptions] = useState<string[]>([]);

  const handleGenreSearch = async (query: string) => {
    if (!query) return;

    try {
      const response = await spotifyService.post(
        `${envConfig.SPOTIFY_SERVICE_URL}/general/getArtists`,
        {
          query: query,
        }
      );

      setGenreOptions(response.data);
    } catch (error) {
      console.error("Error fetching artists:", error);
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
    <>
      <PreferencesPicker
        preferencesName="Genres"
        selectedPreferences={selectedGenres}
        options={genreOptions}
        onChange={updateGenresList}
        onMaxSelected={onNextStep}
        onSearch={handleGenreSearch}
      />
    </>
  );
};

export default TopGenres;
