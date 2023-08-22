import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { MdSettings, MdClose } from "react-icons/md";

import NavbarMenuDrop from "./NavbarMenuDrop.jsx";
import Itemsmenu from "./itemsmenu.jsx";
import "./DropDownMenu.css";
import { useState } from "react";
import Drop from "./Drop.jsx";
import AvatarNav from "../Navbar/AvatarNav.jsx";


AvatarNav
const DropDownMenu = (props) => {
  //  Donde se ejecuta el dropmenu
  // const[dropOpen, setDropOpen]= useState(true);

  return (
    <div>
      <NavbarMenuDrop>
        <Itemsmenu icon={<AvatarNav />}>
          <Drop> </Drop>
        </Itemsmenu>
      </NavbarMenuDrop>
    </div>
  );
};

export default DropDownMenu;
