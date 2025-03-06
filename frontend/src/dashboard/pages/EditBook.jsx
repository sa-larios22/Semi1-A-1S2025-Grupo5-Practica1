import Grid from '@mui/material/Grid2';
import { useBooks } from '../../hooks';

export const EditBook = () => {

    const { book } = useBooks()
  
    return (
  
        <Grid 
            container spacing={3}
            sx={{
                width: '75%',
                padding: '10px',
                margin: '5px',
            }}
            size={12}
        >
            {
                JSON.stringify(book)
            }
        </Grid>
  
    )
}
