import React from 'react'

const NavbarMenuDrop = (props) => {
  return (
    <div>
      <nav className='navbar-menu-drop'>
        <ul className='navbar-menu-drop-ul'>
       {props.children}

        </ul>
      </nav>
    </div>
  )
}

export default NavbarMenuDrop