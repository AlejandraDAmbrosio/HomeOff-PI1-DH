import React from 'react'
import Divider from '@mui/material/Divider';

const TitularSection = ({titulo}) => {
  return (
    <div>
        <div className='titulo-section'>{titulo}</div>
        {/* <Divider className='titulo-section'/> */}
    </div>
  )
}

export default TitularSection