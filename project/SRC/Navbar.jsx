import {
  CalendarDays,
  Compass,
  Heart,
  Menu,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navClass = ({ isActive }) =>
    `navbar-link ${isActive ? "active" : ""}`;

  return (
    <header className="site-navbar">
      <div className="navbar-inner">
        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          <span className="brand-mark">
            <Sparkles size={19} />
          </span>

          <span className="brand-text">
            EVENTORA
          </span>
        </Link>

        <nav
          className={`navbar-menu ${
            menuOpen ? "open" : ""
          }`}
        >
          <NavLink
            to="/"
            className={navClass}
            onClick={closeMenu}
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            className={navClass}
            onClick={closeMenu}
          >
            <Compass size={17} />
            Explore
          </NavLink>

          <NavLink
            to="/calendar"
            className={navClass}
            onClick={closeMenu}
          >
            <CalendarDays size={17} />
            Calendar
          </NavLink>

          <NavLink
            to="/recommendations"
            className={navClass}
            onClick={closeMenu}
          >
            <Sparkles size={17} />
            For You
          </NavLink>

          <NavLink
            to="/favorites"
            className={navClass}
            onClick={closeMenu}
          >
            <Heart size={17} />
            Favorites
          </NavLink>

          <NavLink
            to="/tickets"
            className={navClass}
            onClick={closeMenu}
          >
            <Ticket size={17} />
            My Tickets
          </NavLink>

          <div className="mobile-nav-actions">
            <Link
              to="/create"
              className="nav-create-btn"
              onClick={closeMenu}
            >
              Create Event
            </Link>
          </div>
        </nav>

        <div className="navbar-actions">
          <Link
            to="/favorites"
            className="nav-icon-btn"
            title="Favorites"
          >
            <Heart size={19} />
          </Link>

          <Link
            to="/tickets"
            className="nav-tickets"
          >
            <Ticket size={17} />
            My Tickets
          </Link>

          <Link
            to="/create"
            className="nav-create-btn"
          >
            Create Event
          </Link>
        </div>

        <button
          className="mobile-menu-btn"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;