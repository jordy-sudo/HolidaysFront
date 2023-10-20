import { CircularProgress } from '@mui/material';
import React from 'react';

export const Spinner: React.FC = () => {

    return (
        <div className="spinner-overlay">
            <CircularProgress color="primary" />
        </div>
    );
};

