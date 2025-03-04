import { useAuth, useBooks } from "../../../hooks";
import { Box, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from "react-router-dom";

export const BookCard = ({ book }) => {

    const { user } = useAuth();
    const { startGetBook } = useBooks();
    const navigate = useNavigate();

    const slugBook = book.title.toLowerCase().replace(/ /g, '-');

    const handleBookClick = () => {
        startGetBook(book.id);
        navigate(`/book/${slugBook}`);
    }
  
    return (
        <Grid key={book.id} size={3}
            sx={{
                display: 'flex',
                width: '20%',
                justifyContent: 'center',
                marginTop: '20px',
                cursor: 'pointer'
            }}
            onClick={handleBookClick}
        >
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
                        width: '20%'
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
                {
                    (user && user.books.includes(book.id)) &&
                    (
                        <Chip 
                            label="Agregado"
                            color="success" 
                            size="small"
                            variant="outlined"
                            sx={{
                                marginTop: '5px'
                            }}
                        />
                    )
                }
            </Box>
        </Grid>
    )
}
