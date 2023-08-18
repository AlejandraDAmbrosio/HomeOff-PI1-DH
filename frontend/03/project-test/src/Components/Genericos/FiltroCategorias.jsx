import React from 'react'
import "./FiltroCategorias.css"
import { MdFilterList } from 'react-icons/md';

const FiltroCategorias = () => {
  return (
    <div  className='div-boton-filtro'>
    
    <button className='boton-filtro'>
   
    <MdFilterList className='icono-filtro'  />
    <div className='texto-filtro-icono'>Filtros</div>

    </button>



    </div>
  )
}

export default FiltroCategorias