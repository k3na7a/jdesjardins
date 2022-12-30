import './DemoNavbar.component.css';

import { Github } from 'react-bootstrap-icons';
import { Linkedin } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  const location = useLocation().pathname.split('/')[1];

  return (
    <header className="sticky-top bg-dark">
      <nav className="navbar navbar-dark bg-dark navbar-expand-md">
        <div className="container-fluid">
          <Link to={`/home`} className="navbar-brand noselect">
            <p>Dunder Mifflin™</p>
            <span>Paper Company</span>
          </Link>
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
          <div
            className="collapse navbar-collapse me-auto mb-2 mb-md-0"
            id="navbarNav"
          >
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link
                  to={`/login`}
                  className={`nav-link ${location === 'home' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
            <div className="d-flex align-items-center justify-content-end">
              <a
                className="px-1"
                href="https://www.linkedin.com/in/john-desjardins-96593914b/"
                role="button"
              >
                <Twitter color="white" />
              </a>
              <a
                className="px-1"
                href="https://www.linkedin.com/in/john-desjardins-96593914b/"
                role="button"
              >
                <Linkedin color="white" />
              </a>
              <a
                className="px-1"
                href="https://github.com/k3na7a/jdesjardins"
                role="button"
              >
                <Github color="white" />
              </a>
              <button
                className="btn btn-outline-light ms-3 position-relative"
                type="submit"
              >
                Login
              </button>
              {/* <div className="dropdown text-end ms-3">
                <a
                  href="#"
                  className="d-block dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end text-small">
                  <li>
                    <a className="dropdown-item" href="#">
                      New project...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
