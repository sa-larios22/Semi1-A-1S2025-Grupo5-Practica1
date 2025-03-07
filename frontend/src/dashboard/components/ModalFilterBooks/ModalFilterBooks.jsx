import React from 'react'
import { useUI } from '../../../hooks';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const genres = [
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

export const ModalFilterBooks = () => {

    const { status, startChangeStatusModal } = useUI();
  
    return (
        <Modal
            open={status}
            onClose={startChangeStatusModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box 
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 5,
                }}
            >
                <Typography id="modal-modal-title" variant="h3" component="h3">
                    Filtros
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2, color: 'text.secondary' }}
                    variant="body1" component="p"
                >
                    Selecciona los filtros que deseas aplicar
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography component="span">Genero</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {
                                genres.map(genre => (
                                    <FormGroup
                                        key={genre.id}
                                    >
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            label={genre.name}
                                        />
                                    </FormGroup>
                                ))
                            }
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained">
                        Aplicar
                    </Button>
                </Box>
            </Box>
        </Modal>
  
    )
}
