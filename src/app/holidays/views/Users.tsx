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

import { UploadUsersModal } from '../components/UploadUsersModal';
import * as XLSX from 'xlsx';

export const Users = () => {
  const [isAccordion1Open, setIsAccordion1Open] = useState(false);
  const [isAccordion2Open, setIsAccordion2Open] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDownloadPlantillaExcel = async () => {
    const jsonData = {
      "name": "Nombres del socio",
      "email": "example@icesa.ec",
      "password": "Icesa1234",
      "role": "Empleado/Jefe/Administrador/rrhh",
      "boss": "El jefe debe ser creado primero para que no exista errores este campo puede ir vacio si el jefe no tiene jefe",
      "position": "Example de proyectos y procesos",
      "vacationDays": 25,
      "ci": 1111111114,
      "country": "Quito",
      "department": "Proy/Proc",
      "area": "Proyecto y procesos",
      "dateOfJoining": "Fecha en la que el usuario ingreso a la empresa"
    };

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([jsonData]);
    
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    
    const arrayBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const uint8Array = new Uint8Array(arrayBuffer);
    const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PlantillaUsuariosVacaciones.xlsx';
    a.click();
    
    window.URL.revokeObjectURL(url);
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
              un gran número de usuarios en el sistema teniendo en cuenta el formato establecido para obtener el formato dar click en el botón
              "De color Rojo".
            </Typography>
            <label htmlFor="file-input" style={{ marginLeft: '10px' }}>
              <IconButton style={{ color: green[600] }} aria-label="Cargar Excel" component="span" onClick={handleOpenModal}>
                <InsertDriveFileIcon />
              </IconButton>
            </label>

            <label htmlFor="file-input" style={{ marginLeft: '20px' }}>
              <IconButton style={{ color: 'red' }} aria-label="Cargar Excel" component="span" onClick={handleDownloadPlantillaExcel}>
                <InsertDriveFileIcon />
              </IconButton>
            </label>
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
      <UploadUsersModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
