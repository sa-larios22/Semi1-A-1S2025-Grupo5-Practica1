import { Box, Button, Stack } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useBooks } from '../../hooks';
import { AdminCardBook } from '../components';

export const AdminBooks = () => {

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
                    justifyContent: "flex-end"
                }}
            >
                <Grid
                    item
                    size={12}
                    sx={{
                        
                    }}
                >
                    <Stack
                        spacing={1}
                        direction='row'
                        justifyContent='end'
                    >
                        <Button
                            color='success'
                        >
                            Agregar Libro
                        </Button>
                    </Stack>
                </Grid>
                {
                    books.map((book, idx) => (
                        <Grid
                            key={idx}
                            item
                            size={12}
                        >
                            <AdminCardBook
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
