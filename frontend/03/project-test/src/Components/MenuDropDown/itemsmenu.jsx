import React from 'react'

const itemsmenu = () => {
  return (
    <li className='item-menu-li'>
        <a href='#' className='icon-button-menu-drop'>

            {props.icon}
        </a>

    </li>
  )
}

export default itemsmenu