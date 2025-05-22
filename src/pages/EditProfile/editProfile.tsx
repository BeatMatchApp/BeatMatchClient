import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import TopGenres from '../../components/topGenres/topGenres';
import TopArtists from '../../components/topArtists/topArtists';
import TopSong from '../../components/topSong/topSong';
import { updatePreferences } from '../../services/userPreferencesService';
import { toast } from 'react-toastify';
import { NavigationRoutes } from '../../models/NavigationRoutes';
import { useNavigate } from 'react-router-dom';
import './editProfile.css';

const EditProfileForm: React.FC = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedSong, setSelectedSong] = useState<string>('');

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
    <div className="center">
      <div className="form-container">
        <Typography variant="h4">Edit Your Profile</Typography>

        <TextField
          label="Name"
          value={userDetails.name}
          onChange={(e) =>
            setUserDetails({ ...userDetails, name: e.target.value })
          }
        />

        <TextField
          label="Email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({ ...userDetails, email: e.target.value })
          }
        />

        <TopGenres handleNextStep={setSelectedGenres} />
        <TopArtists handleNextStep={setSelectedArtists} />
        <TopSong handleNextStep={setSelectedSong} />

        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditProfileForm;
