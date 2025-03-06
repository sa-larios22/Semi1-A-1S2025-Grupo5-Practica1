import { IconButton, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useBooks } from '../../../hooks';

export const AdminCardBook = ({ book }) => {

    const navigate = useNavigate()
    const { startGetBook } = useBooks()

    const onEditBook = () => {
        startGetBook(book.id)
        navigate(`/update-book/${book.id}`)
    }
 
    return (
  
        <Grid
            container
            spacing={1}
            size={12}
            padding={2}
        >

            <Grid item size={3}
                sx={{
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
                onClick={onEditBook}
            >
                <Stack
                    spacing={1}
                    direction='row'
                    justifyContent='center'
                >
                    <img
                        src={book.image}
                        alt={book.title}
                        loading="lazy"
                        style={{
                            height: 'auto',
                            width: '50%'
                        }}
                    />
                </Stack>
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
                    <Typography variant="h4" component="h4"
                        sx={{
                            color: 'text.primary',
                            fontWeight: 'bold'
                        }}
                    >
                        {book.title}
                    </Typography>

                    <IconButton
                        color='warning'
                        size='large'
                    >
                        <EditIcon />
                    </IconButton>
                    
                    <IconButton
                        color='error'
                        size='large'
                    >
                        <DeleteIcon />
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
