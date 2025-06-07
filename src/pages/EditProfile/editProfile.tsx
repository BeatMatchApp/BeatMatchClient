import { useEffect, useState } from 'react';
import { Box, Divider, TextField } from '@mui/material';
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
  StyledIconBox,
  StyledMenuButton,
  StyledPageSubtitle,
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
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import theme from '../../styles/consts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
    <Box className="edit-profile-form-container">
      <Box
        className="content-container"
        sx={{ width: { xs: '80vw', sm: '50vw' } }}
      >
        <img
          width="100%"
          src={`/assets/audio2.png`}
          loading="lazy"
          className="logoImg"
        />
        <StyledPageTitle sx={{ marginBottom: '1vh' }}>
          Edit Your Profile
        </StyledPageTitle>

        <StyledIconBox>
          <StyledPageSubtitle> User details </StyledPageSubtitle>
          <AccountCircleIcon
            fontSize="large"
            sx={{
              marginLeft: '5px',
              color: theme.palette.customColors.textSecondary,
            }}
          />
        </StyledIconBox>

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
          format="dd/MM/yyyy"
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

        <StyledIconBox>
          <StyledPageSubtitle>User preferences</StyledPageSubtitle>
          <AutoAwesomeIcon
            fontSize="large"
            sx={{
              marginLeft: '5px',
              color: theme.palette.customColors.textSecondary,
            }}
          />
        </StyledIconBox>

        <Divider sx={{ margin: '5px' }} />

        <Box sx={{ my: '1vh' }}>
          <TopGenres
            setSelectedGenres={setSelectedGenres}
            selectedGenres={selectedGenres}
            genres={selectedGenres}
          />
        </Box>
        <Box sx={{ my: '1vh' }}>
          <TopArtists
            selectedArtists={selectedArtists}
            setSelectedArtists={setSelectedArtists}
            artists={selectedArtists}
          />
        </Box>
        <Box sx={{ my: '1vh' }}>
          <TopSong handleNextStep={setSelectedSong} song={selectedSong} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '1vh',
          }}
        >
          <StyledMenuButton
            disabled={disableSave()}
            variant="contained"
            onClick={handleSave}
          >
            Save Changes
          </StyledMenuButton>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfileForm;
