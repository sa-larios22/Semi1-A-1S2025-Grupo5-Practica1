import { Box, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useAuth } from '../../../hooks';

const books = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        image: '../../../public/cover_book.png'
    },
    {
        id: 2,
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        image: '../../../public/cover_book.png'
    },
    {
        id: 3,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        image: '../../../public/cover_book.png'
    },
    {
        id: 4,
        title: '1984',
        author: 'George Orwell',
        image: '../../../public/cover_book.png'
    },
    {
        id: 5,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        image: '../../../public/cover_book.png'
    },
    {
        id: 6,
        title: 'The Diary of a Young',
        author: 'Anne Frank',
        image: '../../../public/cover_book.png'
    },
    {
        id: 7,
        title: 'The Book Thief',
        author: 'Markus Zusak',
        image: '../../../public/cover_book.png'
    },
    {
        id: 8,
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        image: '../../../public/cover_book.png'
    },
    {
        id: 9,
        title: 'The Kite Runner',
        author: 'Khaled Hosseini',
        image: '../../../public/cover_book.png'
    },
    {
        id: 10,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        image: '../../../public/cover_book.png'
    }
]

export const BooksGrid = () => {

    const { user } = useAuth();

    return (
        <>
            {
                books.map((book) => (
                    <Grid key={book.id} size={3}
                        sx={{
                            display: 'flex',
                            width: '20%',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
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
                                    />
                                )
                            }
                        </Box>
                    </Grid>
                ))
            }
        </>

    )
}
