import React from 'react'
import Divider from '@mui/material/Divider';
import Paper from "@mui/material/Paper";


const TitularSection = ({titulo, estilo}) => {
  return (
    <div>
      {/* <Paper> */}
        <div className={estilo}>{titulo}</div>
        {/* </Paper>  */}
        {/* <Divider className='titulo-section'/> */}
    </div>
  )
}

export default TitularSection