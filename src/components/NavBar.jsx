import React from 'react';
import {Box, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import axios  from 'axios';
import toast  from 'react-hot-toast';
const NavBar = () => {
  const theme=useTheme()
  const loggedIn=JSON.parse(localStorage.getItem('authToken'))
  const navigate=useNavigate()
  // logout function 
  const handleLogout= async()=>{
    try {
      await axios.post('/api/v1/auth/logout')
      localStorage.removeItem("authToken");
      toast.success('Logout Successfully');
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box
      width={'100%'}
      backgroundColor={theme.palette.background.alt}
      p={'1rem 6%'}
      textAlign={'center'}
      sx={{boxShadow: 3, mb: 2}}
    >
      <Typography variant="h1" color={'primary'} fontWeight={'bold'}>
        Interect With OpenAi
      </Typography>
      {
        loggedIn ? (<NavLink to="/login" onClick={handleLogout}  p={1}>Logout</NavLink>):(<>
      <NavLink to="/register" p={1}>Sign Up</NavLink>
      <NavLink to="/login" p={1}>Sign In</NavLink>
        </>)
      }
      {console.log(loggedIn)}
    </Box>
  );
};

export default NavBar;
