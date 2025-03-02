import React from 'react'
import { ModalFilterBooks, NavBar, Sidebar } from './components'
import { Box } from '@mui/material'

export const Layout = ({ children }) => {
   
    return (
        <>
            <Sidebar />
            <NavBar />

            <ModalFilterBooks />
        
            <Box 
                sx={{
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    overflowX: 'hidden',
                    marginLeft: { md: '270px' },
                    transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                    marginTop: '75px',
                }}
            >
                {children}
            </Box>

        </>
    )
}
