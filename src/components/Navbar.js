import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <li>
        <Link to="/">Dogs</Link>
      </li>
      <li>
        <Link to="/about">Cats</Link>
      </li>
    </div>
  );
};

export default Navbar;
