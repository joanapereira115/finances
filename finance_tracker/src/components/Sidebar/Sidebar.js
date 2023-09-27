//import "./sidebar.scss";
import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../../public/logo.png";

const Sidebar = () => {
  return (
    <>
      <nav id="sidebar">
        <img src={logo} alt="finances_logo"></img>
        <ul>
          <li>
            <Link to="/">Página Inicial</Link>
          </li>
          <li>
            <Link to="/income">Rendimentos</Link>
          </li>
          <li>Despesas</li>
          <li>
            <Link to="/">Contas</Link>
          </li>
          <li>
            <Link to="/">IRS</Link>
          </li>
          <li>
            <Link to="/">Relatórios</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Sidebar;
