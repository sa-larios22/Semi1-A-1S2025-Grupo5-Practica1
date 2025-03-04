import { Box, Button, Typography } from '@mui/material';

export const MyBookCard = ({ book }) => {
  
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <img
                src={book.image}
                alt={book.title}
                loading="lazy"
                style={{
                    width: '50%'
                }}
            />
            <Typography
                variant="body1"
                style={{
                    marginTop: '10px',
                    textAlign: 'center',
                    color: 'black'
                }}
            >
                {book.title}
            </Typography>
            <Typography 
                variant="body2"
                style={{
                    textAlign: 'center',
                    color: 'gray'
                }}
            >
                {book.author}
            </Typography>
            
            <Button
                variant="outlined"
                color="secondary"
                sx={{
                    marginTop: '10px',
                    width: '100%'
                }}
                size="large"
            >
                Leer
            </Button>
        </Box>
    )
}
