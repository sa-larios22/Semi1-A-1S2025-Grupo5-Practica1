import { Box } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useBooks } from '../../hooks';
import { SearchCardBook } from '../components';

export const SearchBooks = () => {

    const { books } = useBooks();
  
    return (
        <Box
            sx={{
                transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                marginBottom: '100px',
                width: '80%',
            }}
        >
            <Grid
                container
                spacing={1}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                }}
            >
                {
                    books.map((book, idx) => (
                        <Grid
                            key={idx}
                            item
                            size={12}
                        >
                            <SearchCardBook
                                key={idx}
                                book={book}
                            />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>  
    )
}
