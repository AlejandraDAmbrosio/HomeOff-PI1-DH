import React from 'react'
import NuevoBuscador from './NuevoBuscador/NuevoBuscador'
import { Typography } from '@mui/material'
import "./SegmentoBuscador.css"
export const SegmentoBuscador = () => {
  return (
    <section className='segmento-buscador'>
    <Typography variant="h5" style={{textAlign:"center"}} > Encontrá lo que buscas aquí</Typography>
     <NuevoBuscador></NuevoBuscador>
   </section>
  )
}
