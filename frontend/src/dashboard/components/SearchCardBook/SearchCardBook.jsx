import { IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';

export const SearchCardBook = ({ book }) => {
  
    return (
  
        <Grid
            container
            spacing={1}
            size={12}
            padding={2}
        >

            <Grid item size={3}>
                <img
                    src={book.image}
                    alt={book.title}
                    loading="lazy"
                    style={{
                        height: 'auto',
                        width: '75%'
                    }}
                />
            </Grid>

            <Grid item size={9}
                sx={{
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Stack
                    spacing={2}
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Typography variant="h3" component="h3"
                        sx={{
                            color: 'text.primary',
                            fontWeight: 'bold'
                        }}
                    >
                        {book.title}
                    </Typography>

                    <IconButton
                        color='primary'
                        size='large'
                    >
                        <AddIcon />
                    </IconButton>
                    
                </Stack>
                <Typography variant="subtitle1" component="p"
                    sx={{
                        color: 'text.secondary',
                    }}
                >
                    {book.author}
                </Typography>

                <Typography variant="body1" component="p">
                    {book.description}
                </Typography>
            </Grid>
        </Grid>
    )
}
