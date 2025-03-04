import React from 'react'
import { useBooks } from '../../hooks';
import Grid from '@mui/material/Grid2';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { generateRandomColor } from '../../helpers';

export const Book = () => {

  const { book } = useBooks();

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
      <Grid item size={4}>
        <img
          src={book.image}
          alt={book.title}
          loading="lazy"
          style={{
            height: 'auto',
            width: '100%',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          }}
        />
      </Grid>

      <Grid item size={8}>
        <Stack spacing={2}>
          <Typography variant="h3" component="h3"
            sx={{
              color: 'text.primary',
              fontWeight: 'bold'
            }}
          >
            {book.title}
          </Typography>
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

          <Stack direction="row" spacing={1}>
            {
              book.category.map((cat, idx) => (
                <Chip
                  key={idx}
                  label={cat} 
                  size="small"
                  variant="outlined"
                  sx={{
                    color: `${generateRandomColor()}`,
                    borderColor: `${generateRandomColor()}`,
                  }}
                />
              ))
            }
          </Stack>


        </Stack>
      </Grid>

      <Grid item size={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={{
            marginTop: '10px',
            backgroundColor: 'primary.main',
            color: 'white',
          }}
          size='large'
        >
          Agregar a mis libros
        </Button>
      </Grid>
    </Grid>
  )
}
