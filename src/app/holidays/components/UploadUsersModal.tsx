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
import { processExcelFile } from '../../store/auth/thunks';
import { useAppDispatch } from '../../store/hooks';
import { Spinner } from './Spinner';

interface UploadUsersModalProps {
    open: boolean;
    onClose: () => void;
}

interface CustomSheet2JSONOpts extends XLSX.Sheet2JSONOpts {
    cellDates: boolean;
}

export const UploadUsersModal: React.FC<UploadUsersModalProps> = ({ open, onClose }) => {
    const [excelData, setExcelData] = useState<any[]>([]);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) {
            showToast('Por favor, selecciona un archivo válido. El archivo debe ser un archivo Excel (.xlsx o .xls)', 'error');
            return;
        }

        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            if (e.target?.result) {
                const data = new Uint8Array(e.target.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];

                // Configuración para reconocer el formato de fecha personalizado
                const sheet = workbook.Sheets[firstSheetName];
                const options: CustomSheet2JSONOpts = {
                    header: 0,
                    raw: false,
                    cellDates: true, // Esto permite reconocer el formato de fecha personalizado
                };
                const excelData: any[] = XLSX.utils.sheet_to_json(sheet, options);

                // Convertir el formato de fecha en cada fila
                const excelDataFormatted = excelData.map((row) => {
                    const originalDate = new Date(row.dateOfJoining);
                    const formattedDate = `${originalDate.getFullYear()}/${originalDate.getMonth() + 1}/${originalDate.getDate()}`;
                    // const formattedDate = `${originalDate.getDate()}/${originalDate.getMonth() + 1}/${originalDate.getFullYear()}`;

                    return {
                        ...row,
                        dateOfJoining: formattedDate,
                    };
                });

                setExcelData(excelDataFormatted);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const handleSaveUsers = async () => {
        if (excelData) {
            setLoading(true);
            try {
                await dispatch(processExcelFile(excelData));
                onClose();
                setExcelData([]);
            } catch (error) {
                console.error('Error al cargar usuarios', error);
                showToast('Error al cargar los usuarios', 'error');
            } finally {
                setLoading(false);
            }
        } else {
            showToast('Debes seleccionar algún archivo', 'error');
        }
    };
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'file': ['.xlsx', '.xls']
        },
    });
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Subir Usuarios masivamente</DialogTitle>
            <DialogContent>
                {loading && (<Spinner />)}

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