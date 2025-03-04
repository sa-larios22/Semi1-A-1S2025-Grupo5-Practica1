import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import { FilterButton, BooksGrid } from '../components';



export const Home = () => {
  
    return (
        <Box 
            sx={{
                transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            }}
        >
            <Grid container spacing={1}>
                <Grid size={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                    }}
                >
                    <FilterButton />
                </Grid>

                <BooksGrid />
                
            </Grid>
        </Box>
    )
}
