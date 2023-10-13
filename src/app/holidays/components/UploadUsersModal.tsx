import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { showToast } from '../helpers/RenderToast';

interface UploadUsersModalProps {
    open: boolean;
    onClose: () => void;
}

export const UploadUsersModal: React.FC<UploadUsersModalProps> = ({ open, onClose }) => {
    const [excelData, setExcelData] = useState<any[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) {
          showToast('Por favor, selecciona un archivo valido El archivo debe ser un archivo Excel (.xlsx o .xls)', 'error');
          return;
        }
      
        const file = acceptedFiles[0];

      
        const reader = new FileReader();
      
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
          setExcelData(excelData);
        };
      
        reader.readAsArrayBuffer(file);
      };

    const handleSaveUsers = () => {
        console.log('Guardando usuarios:', excelData);
        // Lógica para guardar usuarios
        onClose(); // Cerrar el modal después de guardar los usuarios
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'file': ['.xlsx', '.xls']
        },
    });
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Subir Archivo Excel</DialogTitle>
            <DialogContent>
                <Box {...getRootProps()} style={dropzoneStyles}>
                    <input {...getInputProps()} />
                    <Typography variant="body1">Arrastra y suelta un archivo Excel aquí, o haz clic para seleccionar uno</Typography>
                </Box>

                {/* Previsualizar datos del Excel */}
                <Typography variant="h6" gutterBottom>Previsualización:</Typography>
                <pre>{JSON.stringify(excelData, null, 2)}</pre>
                {/* {excelData.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(excelData[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {excelData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, colIndex) => (
                                        <td key={colIndex}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )} */}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSaveUsers} color="primary" variant="contained">
                    Guardar Usuarios
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const dropzoneStyles: React.CSSProperties = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    textAlign: 'center',
    padding: '20px',
    cursor: 'pointer',
};