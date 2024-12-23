import React from "react";
import "./NavbarLink.css";
import { NavLink } from "react-router-dom";

const NavbarLink = ({ title, link, sidebar, emoji, logout }) => {
  return (
    <NavLink
      to={link}
      className={
        sidebar ? "align-center sidebar-link" : "align-center navbar-link"
      }
    >
      {title} <img src={emoji} alt="" className="link-emoji" />
    </NavLink>
  );
};

export default NavbarLink;
