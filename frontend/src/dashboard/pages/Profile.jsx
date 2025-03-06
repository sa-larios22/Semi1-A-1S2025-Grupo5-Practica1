import { Avatar, Box, Button, IconButton, Typography, TextField } from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import React, { useState } from 'react';
import { useAuth } from '../../hooks';

export const Profile = () => {
    const { user } = useAuth();

    const [image, setImage] = useState(null);
    const [name, setName] = useState(user.name);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: 4, display: "flex", alignItems: "center", gap: 4 }}>
            {/* Avatar */}
            <Box sx={{ textAlign: "center" }}>
                <Avatar src={image} sx={{ width: 320, height: 320, mb: 2 }} />
                
                {/* Input oculto para seleccionar imagen */}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload"
                    onChange={handleImageChange}
                />

                {/* Botón para cambiar imagen */}
                <label htmlFor="image-upload">
                    <Button variant="contained" component="span" sx={{ bgcolor: "black", "&:hover": { bgcolor: "gray" } }}>
                        Cambiar Imagen
                    </Button>
                </label>
            </Box>

            {/* Info del Perfil */}
            <Box sx={{ flex: 1, bgcolor: "#fdf7eb", p: 3, borderRadius: 2, maxWidth: 600, minWidth: 300 }}>
                {/* Edición de nombre y apellido */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {isEditingName ? (
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={`${name} ${lastname}`}
                            onChange={(e) => {
                                const [newName, newLastName] = e.target.value.split(" ");
                                setName(newName || "");
                                setLastname(newLastName || "");
                            }}
                        />
                    ) : (
                        <Typography variant="h3" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                            {name} {lastname}
                        </Typography>
                    )}
                    <IconButton onClick={() => setIsEditingName(!isEditingName)}>
                        {isEditingName ? <Save /> : <Edit />}
                    </IconButton>
                </Box>

                {/* Edición de correo electrónico */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {isEditingEmail ? (
                        <TextField
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    ) : (
                        <Typography sx={{ color: "gray", flexGrow: 1, fontSize: "1.5rem" }}>
                            {email}
                        </Typography>
                    )}
                    <IconButton onClick={() => setIsEditingEmail(!isEditingEmail)}>
                        {isEditingEmail ? <Save /> : <Edit />}
                    </IconButton>
                </Box>

                <Typography sx={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                    Libros adquiridos: 0 {/* Pendiente hasta que hayan endpoints */}
                </Typography>
            </Box>
        </Box>
    );
};
