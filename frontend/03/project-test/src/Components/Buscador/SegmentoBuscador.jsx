import React from 'react'
import NuevoBuscador from './NuevoBuscador/NuevoBuscador'
import { Typography } from '@mui/material'
import "./SegmentoBuscador.css"
export const SegmentoBuscador = () => {
  return (
    <section className='segmento-buscador'>
    <Typography style={{textAlign:"center", color:"white", fontSize:"38px", fontWeight:"300"}} >Encontrá tu mejor opción</Typography>
     <NuevoBuscador></NuevoBuscador>
   </section>
  )
}
