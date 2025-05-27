import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import TopGenres from '../../components/topGenres/topGenres';
import TopArtists from '../../components/topArtists/topArtists';
import TopSong from '../../components/topSong/topSong';
import {
  getPreferences,
  updatePreferences,
} from '../../services/userPreferencesService';
import { toast } from 'react-toastify';
import { NavigationRoutes } from '../../models/NavigationRoutes';
import { useNavigate } from 'react-router-dom';
import './editProfile.css';
import {
  StyledFormBox,
  StyledPageTitle,
} from '../../components/styledComponents';
import {
  validateBirthDate,
  validateEmail,
  validateName,
} from '../../shared/field-validations';
import { DatePicker } from '@mui/x-date-pickers';
import { UserPreferences } from '../../models/interfaces/UserPreferences';

interface Errors {
  name: string;
  email: string;
  birthDate: string;
}

const EditProfileForm = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    birthDate: null as Date | null,
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string>('');
  const [userPrefrences, setUserPrefrences] = useState<UserPreferences>();

  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    birthDate: '',
  });

  useEffect(() => {
    const fetchUserPreferences = async () => {
      const userPrefrencesRes = await getPreferences();
      setSelectedGenres(userPrefrencesRes?.genres || []);
      setSelectedArtists(userPrefrencesRes?.artists || []);
      setSelectedSong(userPrefrencesRes?.song || '');
    };

    fetchUserPreferences();
  }, []);

  const handleSave = async () => {
    try {
      //   await updateUserDetails(userDetails);
      await updatePreferences({
        artists: selectedArtists,
        genres: selectedGenres,
        song: selectedSong,
      });

      toast.success('Your profile was updated successfully!');
      navigate(NavigationRoutes.USER_ACTIONS_PAGE);
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="edit-profile-form-container">
      <div className="content-container">
        <StyledPageTitle>Edit Your Profile</StyledPageTitle>

        <TextField
          id="name"
          label="Name"
          error={!!errors.name}
          helperText={errors.name}
          onChange={(e) => {
            const name = e.target.value;
            setUserDetails({ ...userDetails, name: e.target.value });
            validateName<Errors>(name, setErrors);
          }}
        />

        <DatePicker
          label="Date of birth"
          value={userDetails.birthDate}
          onChange={(newDate) => {
            setUserDetails((prevState) => ({
              ...prevState,
              birthDate: newDate,
            }));
            validateBirthDate<Errors>(newDate, setErrors);
          }}
          slotProps={{
            textField: {
              error: !!errors.birthDate,
              helperText: errors.birthDate,
            },
          }}
        />

        <TextField
          id="email"
          label="Email"
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => {
            const email = e.target.value;
            setUserDetails((prevState) => ({ ...prevState, email }));
            validateEmail<Errors>(email, setErrors);
          }}
        />

        <TopGenres handleNextStep={setSelectedGenres} genres={selectedGenres} />
        <TopArtists
          handleNextStep={setSelectedArtists}
          artists={selectedArtists}
        />
        <TopSong handleNextStep={setSelectedSong} song={selectedSong} />

        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditProfileForm;
