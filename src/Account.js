import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Container, Typography } from '@mui/material';
import api from './components/api.js';

const Account = () => {
  const [userInfo, setUserInfo] = useState({
    id:'',
    firstname: '',
    lastname: '',
    birthdate: '',
    addresses: {
      Office: {
        Home: '',
        Number: '',
        PostalCode: '',
        City: '',
        Country: ''
      },
      Work: {
        Street: '',
        Number: '',
        PostalCode: '',
        City: '',
        Country: ''
      }
    }
  });

  useEffect(() => {
    const fetchProfileInfo = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const profileData = await api.getProfile(token);
          if (profileData) {
            setUserInfo(currentState => ({
              ...currentState,
              ...profileData,
              addresses: profileData.addresses || currentState.addresses 
            }));
          }
        } catch (error) {
          console.error("Error fetching profile information:", error);
        }
      }
    };

    fetchProfileInfo();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.includes('.')) {
      const [addressType, field] = name.split('.');
      setUserInfo(prevState => ({
        ...prevState,
        addresses: {
          ...prevState.addresses,
          [addressType]: {
            ...prevState.addresses[addressType],
            [field]: value
          }
        }
      }));
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userInfo);
    await api.putUpdateAccount(localStorage.getItem('token'), userInfo);
  };
  const renderAddressFields = (prefix) => (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Street"
        name={`${prefix}.Street`}
        value={userInfo.addresses[prefix].Street}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Number"
        name={`${prefix}.Number`}
        value={userInfo.addresses[prefix].Number}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Postal Code"
        name={`${prefix}.PostalCode`}
        value={userInfo.addresses[prefix].PostalCode}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="City"
        name={`${prefix}.City`}
        value={userInfo.addresses[prefix].City}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Country"
        name={`${prefix}.Country`}
        value={userInfo.addresses[prefix].Country}
        onChange={handleChange}
      />
    </>
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography variant="h6">Personal Information</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="given-name"
            autoFocus
            value={userInfo.firstname}
            onChange={handleChange}
            />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="family-name"
            value={userInfo.lastname}
            onChange={handleChange}
            />
          <TextField
            margin="normal"
            id="birthdate"
            label="Birthdate"
            type="date"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            value={userInfo.birthdate}
            onChange={handleChange}
          />
          <Typography mt={3} variant="h6">Home Address</Typography>
          {renderAddressFields('Home')}
          <Typography mt={3} variant="h6">Work Address</Typography>
          {renderAddressFields('Work')}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Account;
