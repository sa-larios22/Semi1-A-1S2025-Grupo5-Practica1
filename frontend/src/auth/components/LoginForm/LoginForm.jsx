import { Box, Button, Link, TextField, Typography } from '@mui/material'
import React from 'react'
import { useAuth, useForm } from '../../../hooks'

const loginFields = {
    email: '',
    password: '',
}

export const LoginForm = () => {

    const { email, password, onInputChange } = useForm(loginFields);
    const { startLogin } = useAuth();
  
    const onLogin = (e) => {
        e.preventDefault();
        startLogin({ email, password });
    }

    return (
        <Box
            sx={{
                border: '1px solid black',
                padding: '20px',
                borderRadius: '5px',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <Typography 
                variant="h4"
                align="center"
            >
                Login
            </Typography>


            <TextField
                label="email" 
                variant="outlined" 
                value={email}
                onChange={onInputChange}
                name='email'
            />

            <TextField
                label="password"
                variant="outlined"
                value={password}
                onChange={onInputChange}
                name='password'
            />

            <Button variant="contained"
                onClick={onLogin}
            >
                Login
            </Button>


            <Typography 
                variant="body2"
                align="center"
            >
                Don't have an account?  
                <Link
                    underline="hover"
                    sx={{
                        marginLeft: '5px'
                    }}
                    href="/auth/register"
                >
                     Register
                </Link>
            </Typography>
        </Box>
    )
}
