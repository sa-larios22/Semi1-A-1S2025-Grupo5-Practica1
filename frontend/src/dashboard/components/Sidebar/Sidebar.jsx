import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { menu } from '../../../helpers'
import { useAuth } from '../../../hooks'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {

    const { user } = useAuth();
    const navigate = useNavigate();
  
    return (
        <Box 
            display={{ sm: "none", md: "block" }} 
            w="100%" 
            position='fixed'
            zIndex={1}
        >
            <Box
                sx={{
                    position: 'fixed',
                    width: '250px',
                    height: '100vh',
                    margin: '0px',
                    minHeight: '100%',
                    overflowX: 'hidden',
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    backgroundColor: '#C4CDDF',
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        textAlign: 'center',
                        padding: '20px 0',
                        color: '#000',
                        fontWeight: 'bold',
                        borderBottom: '2px solid #000',
                    }}
                >
                    {user.name} {user.lastname}    
                </Typography>
                {
                    // render options by user role
                    menu.filter(item => item.roles.includes(user.role)).map((item, index) => (
                        <Button
                            key={index}
                            sx={{
                                padding: '10px',
                                color: '#000',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                width: '100%',
                            }}
                            onClick={() => navigate(item.url)}
                        >
                            {item.title}
                        </Button>
                    ))
                }
            </Box>
        </Box>
  
    )
}
