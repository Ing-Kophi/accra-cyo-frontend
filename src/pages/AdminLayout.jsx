import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../utils/auth";

export default function AdminDashboard() {
  const handleLogout = () => {
    logout();
    window.location.href = "/admin/login";
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">

        {/* SIDEBAR */}
        <div className="col-md-3 col-lg-2 bg-success text-white p-3">
          <h5 className="text-center mb-4">
            CYO Admin
          </h5>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <NavLink to="/admin/dashboard" className="text-white text-decoration-none">
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink to="/admin/years" className="text-white text-decoration-none">
                Registration Years
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink to="/admin/deaneries" className="text-white text-decoration-none">
                Deaneries
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink to="/admin/parishes" className="text-white text-decoration-none">
                Parishes
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink to="/admin/registrations" className="text-white text-decoration-none">
                Registrations
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink to="/admin/view-registrations" className="text-white text-decoration-none">
                View Registrations
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink to="/admin/posts" className="text-white text-decoration-none">
              News & Events
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink to="/admin/documents" className="text-white text-decoration-none">
              Document Center
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink to="/admin/contact/executives" className="text-white text-decoration-none">
              Executives
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink to="/admin/contact/office" className="text-white text-decoration-none">
              Office Contact
              </NavLink>
            </li>

            <li className="nav-item mb-2">
              <NavLink to="/admin/media" className="text-white text-decoration-none">
              Media Gallery
              </NavLink>
            </li>

          </ul>

        </div>

        {/* MAIN CONTENT */}
        <div className="col-md-9 col-lg-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="cyogreen mb-0">
                For God and Ghana!
              </h4>
              <small className="text-muted">
                Thanks be to God.
              </small>
            </div>

            <button
              className="btn btn-outline-success"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <div className="alert alert-success">
            <Outlet />
          </div>

        </div>
      </div>
    </div>
  );
}
