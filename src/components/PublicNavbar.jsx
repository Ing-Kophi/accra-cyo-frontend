import { NavLink } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">

        {/* LEFT: LOGO + NAME */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/logo_cyo.png"
            alt="Accra Archdiocese Logo"
            height="40"
            className="me-2"
          />
          <span className="fw-bold">
            Accra Archdiocese
          </span>
        </NavLink>

        {/* TOGGLER (MOBILE) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#publicNavbar"
          aria-controls="publicNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* RIGHT: MENU */}
        <div className="collapse navbar-collapse" id="publicNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/news">
                News & Events
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About Accra CYO
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/registration-figures">
                National Registration
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/media">
                Media
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact_us">
                Contact Us
              </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}
