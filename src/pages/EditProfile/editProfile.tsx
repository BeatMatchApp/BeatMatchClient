import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
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
  StyledMenuButton,
  StyledPageTitle,
} from '../../components/styledComponents';
import {
  validateBirthDate,
  validateEmail,
  validateName,
} from '../../shared/fieldValidations';
import { DatePicker } from '@mui/x-date-pickers';
import { getUserDetails, updateUserDetails } from '../../services/userService';
import { formatDate } from '../../shared/dateFormatter';

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

    const fetchUserDetails = async () => {
      const userDetailsRes = await getUserDetails();

      setUserDetails({
        name: userDetailsRes.name,
        email: userDetailsRes.email,
        birthDate: new Date(userDetailsRes.birthDate),
      });
    };

    fetchUserDetails();
    fetchUserPreferences();
  }, []);

  const disableSave = () => {
    return Object.values(errors).some((error) => error !== '');
  };

  const handleSave = async () => {
    try {
      if (userDetails.birthDate) {
        await updateUserDetails({
          ...userDetails,
          birthDate: formatDate(userDetails.birthDate),
        });

        await updatePreferences({
          artists: selectedArtists,
          genres: selectedGenres,
          song: selectedSong,
        });

        toast.success('Your profile was updated successfully!');
        navigate(NavigationRoutes.MAIN_PAGE);
      } else {
        toast.info("Birth date can't be empty.");
      }
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
          value={userDetails.name}
          error={!!errors.name}
          helperText={errors.name}
          onChange={(e) => {
            const name = e.target.value;
            setUserDetails({ ...userDetails, name: e.target.value });
            validateName<Errors>(name, setErrors);
          }}
          slotProps={{ inputLabel: { shrink: !!userDetails.name } }}
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
          value={userDetails.email}
          error={!!errors.email}
          helperText={errors.email}
          onChange={(e) => {
            const email = e.target.value;
            setUserDetails((prevState) => ({ ...prevState, email }));
            validateEmail<Errors>(email, setErrors);
          }}
          slotProps={{ inputLabel: { shrink: !!userDetails.email } }}
        />

        <TopGenres
          setSelectedGenres={setSelectedGenres}
          selectedGenres={selectedGenres}
          genres={selectedGenres}
        />
        <TopArtists
          selectedArtists={selectedArtists}
          setSelectedArtists={setSelectedArtists}
          artists={selectedArtists}
        />
        <TopSong handleNextStep={setSelectedSong} song={selectedSong} />

        <StyledMenuButton
          disabled={disableSave()}
          variant="contained"
          onClick={handleSave}
        >
          Save Changes
        </StyledMenuButton>
      </div>
    </div>
  );
};

export default EditProfileForm;
