import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HolidaysPage } from '../pages/HolidaysPage'

export const HolidaysRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<HolidaysPage/>}/>
        <Route path='/*' element={<Navigate to="/"/>}/>
    </Routes>
  )
}