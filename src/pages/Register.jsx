import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import { Alert, Box, Button, Collapse, TextField, Typography, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
const Register = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  // media
  const isNotMobile = useMediaQuery("(min-width:1000px)")

  // states
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // register ctrl 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/v1/auth/register', { username, email, password })
      toast.success('User Registered Successfully')
      navigate('/login')
    } catch (err) {
      console.log(err);
      if (err.response.data.error) {
        setError(err.response.data.error)
      }
      else if (err.message) {
        setError(err.message)
        setTimeout(() => {
          setError('')
        }, 5000);
      }
    }
  }

  return (
    <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'} m={'2rem auto'} borderRadius={5} sx={{ boxShadow: 5 }} backgroundColor={theme.palette.background.alt}>
      <Collapse in={error}>
        <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant='h3'>
          Sign Up
        </Typography>
        <TextField label='username' required margin='normal' fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label='email' required type='email' margin='normal' fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label='password' required type='password' margin='normal' fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button type='submit' fullWidth variant='contained' size='large' sx={{ color: 'white', mt: 2 }} >Sign Up</Button>
        <Typography mt={2} >Already have an account <Link to={'/login'}>Please Login</Link> </Typography>
      </form>
    </Box>
  )
}

export default Register
