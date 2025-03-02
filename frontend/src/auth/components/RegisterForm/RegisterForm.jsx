import { Avatar, Box, Button, styled, TextField, Typography } from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const RegisterForm = () => {
  return (
    <Box
      sx={{
        border: '1px solid black',
        padding: '20px',
        borderRadius: '5px',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Typography
        variant="h4"
        align="center"
      >
        Register
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <Avatar
          sx={{
            width: '75px',
            height: '75px',
            backgroundColor: 'black',
            color: 'white',
            fontSize: '2rem',
            alignSelf: 'center',
          }}
        >
          IMG
        </Avatar>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          size='small'
        >
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => console.log(event.target.files)}
            multiple
          />
        </Button>
      </Box>

      <TextField
        label="Name"
        variant="outlined" 
      />
      
      <TextField
        label="Lastname" 
        variant="outlined" 
      />
      
      <TextField
        label="Email"
        type='email'
        variant="outlined" 
      />
      
      <TextField
        label="Password"
        type='password'
        variant="outlined" 
      />
      
      <TextField
        label="Confirmed Password"
        type='password'
        variant="outlined" 
      />
      
      <TextField
        label="Fecha de nacimiento"
        variant="outlined"
      />

      <Button variant="contained">
        Register
      </Button>

    </Box>
  )
}
