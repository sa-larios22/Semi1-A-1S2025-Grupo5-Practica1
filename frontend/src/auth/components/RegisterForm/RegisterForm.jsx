import {
  Avatar,
  Box,
  Button,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useForm, useAuth } from "../../../hooks";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const registerForms = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterForm = () => {
  const [birthdate, setBirthdate] = useState(null);
  const [image, setImage] = useState(null);

  const { startRegisterUser } = useAuth();
  const { onInputChange, name, lastname, email, password, confirmPassword } =
    useForm(registerForms);

  const onRegister = () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      // TODO: Show error message
      return;
    }
    const yyymmdd = `${birthdate.$y}-${birthdate.$M + 1}-${birthdate.$D}`;
    // post for image
    startRegisterUser({ name, lastname, email, password, yyymmdd, image });
  };

  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: "20px",
        borderRadius: "5px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Typography variant="h4" align="center">
        Register
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        name="name"
        value={name}
        onChange={onInputChange}
      />

      <TextField
        label="Lastname"
        variant="outlined"
        name="lastname"
        value={lastname}
        onChange={onInputChange}
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        name="email"
        value={email}
        onChange={onInputChange}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        name="password"
        value={password}
        onChange={onInputChange}
      />

      <TextField
        label="Confirmed Password"
        type="password"
        variant="outlined"
        name="confirmPassword"
        value={confirmPassword}
        onChange={onInputChange}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          label="Año de nacimiento"
          value={birthdate}
          onChange={setBirthdate}
        />
      </LocalizationProvider>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Avatar
          sx={{
            width: "75px",
            height: "75px",
            backgroundColor: "black",
            color: "white",
            fontSize: "2rem",
            alignSelf: "center",
          }}
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          size="small"
        >
          Subir imagen de perfil
          <VisuallyHiddenInput
            type="file"
            multiple
            accept="image/*"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>
      </Box>

      <Button variant="contained" onClick={onRegister}>
        Register
      </Button>
    </Box>
  );
};
