import { Box, Typography } from "@mui/material"

export const AuthLayout = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography
                variant="h3" 
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    color: 'primary.main',
                    marginBottom: '70px',
                }}
            >
                eBookVault
            </Typography>
            {children}
        </Box>
    )
}
