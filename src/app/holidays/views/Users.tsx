import React, { useState, ChangeEvent } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { green } from '@mui/material/colors';

export const Users = () => {
  const [isAccordion1Open, setIsAccordion1Open] = useState(false);
  const [isAccordion2Open, setIsAccordion2Open] = useState(false);
  // const [isAccordion3Open, setIsAccordion3Open] = useState(false);

  const handleAccordion1Toggle = () => {
    setIsAccordion1Open(!isAccordion1Open);
  };

  const handleAccordion2Toggle = () => {
    setIsAccordion2Open(!isAccordion2Open);
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile: File = event.target.files[0];
      // Aquí puedes procesar el archivo seleccionado
      console.log(selectedFile);
    }
  };

  // const handleAccordion3Toggle = () => {
  //   setIsAccordion3Open(!isAccordion3Open);
  // };

  return (
    <div >
      <Typography variant="h4" gutterBottom>
        Administracion de Usuarios
      </Typography>
      <Accordion expanded={isAccordion1Open} onChange={handleAccordion1Toggle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='overline'>Carga Masiva de usuarios</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Typography>
              Esta opción te permite cargar usuarios en masa. Al hacer clic en el botón 
              "De color Verde", se realizará una acción específica para cargar 
              un gran número de usuarios en el sistema teniendo en cuenta el formato establecido.
            </Typography>
            <label htmlFor="file-input" style={{ marginLeft: '20px' }}>
              <IconButton style={{ color: green[600] }} aria-label="Cargar Excel" component="span">
                <InsertDriveFileIcon />
              </IconButton>
            </label>
            <input
              id="file-input"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={isAccordion2Open} onChange={handleAccordion2Toggle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='overline'>Segundo Acordeón</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            Contenido del segundo acordeón.
          </Box>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion expanded={isAccordion3Open} onChange={handleAccordion3Toggle}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant='overline'>Tercer Acordeón</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            Contenido del tercer acordeón.
          </Box>
        </AccordionDetails>
      </Accordion> */}
    </div>
  );
}
