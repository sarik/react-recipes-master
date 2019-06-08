import React from "react";
import { NavLink } from "react-router-dom";
import Signout from "./Auth/Signout";

const Navbar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? (
      <NavbarAuth session={session} />
    ) : (
      <NavbarUnauth />
    )}
  </nav>
);

const NavbarAuth = ({ session }) => (
  <div>
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <Signout/>
      </li>
    </ul>
     <h3>Welcome <strong>{session.getCurrentUser.username}</strong></h3>
  </div>
);

const NavbarUnauth = () => (
  <ul>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    <li>
      <NavLink to="/signin">Signin</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
);

export default Navbar;
