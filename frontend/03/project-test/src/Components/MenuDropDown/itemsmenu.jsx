import React from 'react'
import "./Itemsmenu.css";
import { useState } from "react";

const Itemsmenu = (props) => {
  const[dropOpen, setDropOpen]= useState(false);

  
  

  return (
    <li className="item-menu-li">
      <a href="#" className="icon-button-menu-drop" /* onClick={toggleBox} */ onClick={()=>setDropOpen(!dropOpen)}>
        {props.icon}
      </a>

      {dropOpen && props.children}
      
    </li>


  )
}

export default Itemsmenu;