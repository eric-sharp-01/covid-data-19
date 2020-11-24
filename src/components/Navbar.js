import React from 'react';
import { Link } from "react-router-dom";

const Navbar = (props) => {

  return (
    <div className="header-navbar">
      <div className="brand-area">
        <Link to={'/'} className="brand-title">Covid-19</Link>
      </div>
      <div className="menu-area">
        <ul>
          <li>
            <Link className="link" to={'/'}>Home</Link>
          </li>
          <li>
            <Link className="link" to={'/countries'}>Countries</Link>
          </li>
        </ul>
      </div>
    </div>
  );

}

export default Navbar;