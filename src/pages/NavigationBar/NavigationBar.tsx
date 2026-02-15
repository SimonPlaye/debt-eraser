import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

export const NavigationBar = () => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/capital-tax", label: "Capital Tax" },
    { path: "/heritage-tax", label: "Heritage Tax" },
    { path: "/spending-reduction", label: "Spending Reduction" },
    { path: "/capital-exceptional-debit", label: "Exceptional Debit" },
    { path: "/general-assumptions", label: "Assumptions" },
    { path: "/references", label: "References" },
  ];

  return (
    <nav className="top-nav">
      <ul className="nav-list">
        {links.map((link) => (
          <li key={link.path} className="nav-item">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
