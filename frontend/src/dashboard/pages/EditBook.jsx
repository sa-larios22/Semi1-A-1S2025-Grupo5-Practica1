import { useState } from 'react';
import { Grid, Avatar, Box, Button, Chip, TextField, Typography } from '@mui/material';
import { useBooks } from '../../hooks';

export const EditBook = () => {
    const { book } = useBooks();

    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [description, setDescription] = useState(book.description);
    const [categories, setCategories] = useState(book.category);
    const [image, setImage] = useState(book.image);

    // Temporal: Manejo de cambio de imagen
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(imageURL);
        }
    };

    return (
        <Grid
            container 
            spacing={2}
            justifyContent="flex-start"
            sx={{
                width: "95%",
                padding: "2px",
                margin: "auto",
                display: "flex",
                alignItems: "flex-start",
                alignContent: "start"
            }}
        >
            {/* Sección de Editar Portada */}
            <Grid item xs={12} md={2.5} sx={{ display: "flex", flexDirection: "column", alignItems: "auto", maxWidth: "300px" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                    Editar Libro
                </Typography>

                <Avatar src={image} variant="square" sx={{ width: 240, height: 300, mb: 2 }} />

                {/* Input oculto para subir imagen */}
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="image-upload"
                    onChange={handleImageChange}
                />

                <label htmlFor="image-upload">
                    <Button variant="contained" component="span" sx={{ bgcolor: "black", "&:hover": { bgcolor: "gray" } }}>
                        Cambiar Portada
                    </Button>
                </label>
            </Grid>

            {/* Sección de Información del Libro */}
            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Título */}
                <TextField
                    fullWidth
                    label="Título"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                {/* Autor */}
                <TextField
                    fullWidth
                    label="Autor"
                    variant="outlined"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                {/* Descripción */}
                <TextField
                    fullWidth
                    label="Descripción"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                {/* Categorías */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 1 }}>Categorías</Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {categories.map((category, index) => (
                            <Chip key={index} label={category} color="primary" />
                        ))}
                    </Box>
                </Box>

                {/* Botón de Guardar */}
                <Box sx={{ textAlign: "right", mt: 2 }}>
                    <Button variant="contained" color="primary" sx={{ fontSize: "1.1rem", px: 3 }}>
                        Guardar Cambios
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};
