import React from "react";
import { NavLink } from "react-router-dom";

export default function NavComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light  indigo-c">
      <div className="container-fluid">
        {/*<NavLink to="/" className="navbar-brand">Converter</NavLink>*/}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeClassName="active">
                Головна
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link "
                aria-current="page"
                to="/converter"
              >
                Конвертер валют
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
