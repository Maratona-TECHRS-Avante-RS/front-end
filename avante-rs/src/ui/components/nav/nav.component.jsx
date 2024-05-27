import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./index.css";

export function Nav() {
  const activeClassName = "active-link";
  const location = useLocation();

  useEffect(() => {}, [location]);

  return (
    <nav className="nav">
      <NavLink
        to="/pedir-ajuda"
        className={({ isActive }) =>
          isActive ? `link-nav ${activeClassName}` : "link-nav"
        }
      >
        <span>Pedir ajuda</span>
      </NavLink>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          isActive ? `link-nav ${activeClassName}` : "link-nav"
        }
      >
        <span>Chamados abertos</span>
      </NavLink>
      <NavLink
        to="/perfil"
        className={({ isActive }) =>
          isActive ? `link-nav ${activeClassName}` : "link-nav"
        }
      >
        <span>Meu perfil</span>
      </NavLink>
    </nav>
  );
}
