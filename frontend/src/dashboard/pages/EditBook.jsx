import { useState } from 'react';
import { Avatar, Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useBooks } from '../../hooks';

const category = [
    {
        id: 1,
        name: 'Aventura'
    },
    {
        id: 2,
        name: 'Romance'
    },
    {
        id: 3,
        name: 'Terror'
    },
    {
        id: 4,
        name: 'Ciencia Ficción'
    },
    {
        id: 5,
        name: 'Fantasía'
    },
    {
        id: 6,
        name: 'Educación'
    },
    {
        id: 7,
        name: 'Biografía'
    },
    {
        id: 8,
        name: 'Infantil'
    },
    {
        id: 9,
        name: 'Juvenil'
    },
    {
        id: 10,
        name: 'Economía'
    },
]

export const EditBook = () => {
    const { book, startBook } = useBooks();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [year, setYear] = useState('');
    const [categories, setCategories] = useState([]);
    const [image, setImage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [pdf, setPDF] = useState('');

    if (book.id) {
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.synapsis);
        setCategories(book.categories);
        setImage(book.coverImage);
        setPDF(book.pdfUrl);
    }

    // Temporal: Manejo de cambio de imagen
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImage(file);
            setImagePreview(imageURL);
        }
    };

    // Temporal: PDF' book
    const handlePDFChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPDF(file);
        }
    }

    const handleCategories = (event) => {
        const { target: { value }, } = event;
        setCategories( typeof value === 'string' ? value.split(',') : value,);
    }

    const handleSaveChanges = () => {
        if (!book.id) {
            // Crear libro

            // get name of categories selected
            const categoriesName = categories.map((cate) => {
                const categoryFound = category.find((cat) => cat.id === cate);
                return {
                    genero: categoryFound.name,
                    tema: ''
                }
            });

            startBook({
                title,
                author,
                coverImage: image,
                synopsis: description,
                categories: categoriesName,
                year,
                pdfUrl: pdf,
            });
        } else {
            // Editar libro
        }
    }

    return (
        <Grid
            container 
            spacing={2}
            justifyContent="flex-start"
            sx={{
                width: "95%",
                padding: "2px",
                marginTop: "20px",
                marginX: "auto",
                display: "flex",
                alignItems: "flex-start",
                alignContent: "start"
            }}
        >
            {/* Sección de Editar Portada */}
            <Grid item size={{ xs: 12, md: 3 }} sx={{ display: "flex", flexDirection: "column", alignItems: "auto", maxWidth: "300px" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                    Libro
                </Typography>

                <Avatar src={imagePreview} variant="square" sx={{ width: 240, height: 300, mb: 2 }} />

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
            <Grid item size={{ xs: 12, md: 6 }} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

                <TextField
                    fullWidth
                    label="Año"
                    variant="outlined"
                    rows={4}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />

                {/* Categorías */}
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Categorias</InputLabel>
                        <Select
                            value={categories}
                            label="Categorias"
                            onChange={handleCategories}
                            multiple
                        >
                            {
                                category.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>

                {/* Input oculto para subir imagen */}
                <input
                    type="file"
                    style={{ display: "none" }}
                    id="pdf-upload"
                    onChange={handlePDFChange}
                />

                <label htmlFor="pdf-upload">
                    <Button variant="contained" component="span" sx={{ bgcolor: "black", "&:hover": { bgcolor: "gray" } }}>
                        Contenido
                    </Button>
                </label>

                {/* Botón de Guardar */}
                <Box sx={{ textAlign: "right", mt: 2 }}>
                    <Button variant="contained" color="primary" sx={{ fontSize: "1.1rem", px: 3 }}
                        onClick={handleSaveChanges}
                    >
                        Guardar Cambios
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};
