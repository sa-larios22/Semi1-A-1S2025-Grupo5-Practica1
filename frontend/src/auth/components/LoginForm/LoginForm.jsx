import { Box, Button, Link, TextField, Typography } from '@mui/material'
import React from 'react'

export const LoginForm = () => {
  
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
            />

            <TextField
                label="password"
                variant="outlined"
            />

            <Button variant="contained">
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
