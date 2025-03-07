import { Box, Button, Typography } from '@mui/material';
import { useBooks } from '../../../hooks';

export const MyBookCard = ({ book }) => {

    const { startReadBook } = useBooks();

    const handleBookClick = async() => {
        console.log(book.pdfUrl)
        if (book.pdfUrl) {
            window.open(`https://docs.google.com/gview?url=${encodeURIComponent(book.pdfUrl)}&embedded=true`, '_blank');
        } else {
            startReadBook(book.id);
        }
    }
  
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <img
                src={book.coverImage}
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
                onClick={handleBookClick}
            >
                Leer
            </Button>
        </Box>
    )
}
