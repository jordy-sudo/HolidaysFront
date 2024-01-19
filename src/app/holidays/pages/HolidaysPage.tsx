// HolidaysPage.tsx
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { HolidaysLayout } from '../layouts/HolidaysLayout';
import { NothingSelected } from '../views/NothingSelected';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { RenderComponent } from '../helpers/RenderComponent';
import { AddOutlined } from '@mui/icons-material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from '../components/Modal';
import { createEvent } from '../../store/events/thunks';
import moment from 'moment';
// import 'moment-timezone';



export const HolidaysPage: React.FC = () => {
  const { view } = useAppSelector((state: RootState) => state.sidebar);
  const dispatch = useAppDispatch();


  const [isModalOpen, setIsModalOpen] = useState(false);

  const createNewNote = () => {
    setIsModalOpen(true); 
  };

  const CloseModal = () => {
    setIsModalOpen(false); 
  };

  const CreateEvent = (data: any) => {
    // console.log(data);
    
    const formattedData = {
      ...data,
      start: moment(data.start).startOf('day').format(), 
      end: moment(data.end).endOf('day').format(),       
    };
    dispatch(createEvent(formattedData));
  };
  


 

  const selectedComponent = RenderComponent[view] || <NothingSelected />;

  return (
    <HolidaysLayout>
      {selectedComponent}
      <ToastContainer />
      <div style={{ position: 'relative' }}>
        <IconButton
          onClick={createNewNote}
          size="large"
          sx={{
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 50,
            bottom: 10,
            zIndex: 9999,
          }}
        > 
          <AddOutlined sx={{ fontSize: 30 }} />
        </IconButton>
      </div>
      <Modal open={isModalOpen} onClose={CloseModal} onSubmit={CreateEvent}/>
    </HolidaysLayout>
  );
};
