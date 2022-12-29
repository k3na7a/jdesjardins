import './DemoNavbar.component.css';

import { Github } from 'react-bootstrap-icons';
import { Linkedin } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="index.html">
          <p>Dunder Mifflin™</p>
          <span>Paper Company</span>
        </a>
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
          className="collapse navbar-collapse me-auto mb-2 mb-lg-0"
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
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
          <div className="d-flex align-items-center">
            <div className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr className="d-lg-none text-white-50"></hr>
            <a
              className="px-1"
              href="https://github.com/mdbootstrap/mdb-ui-kit"
              role="button"
            >
              <Linkedin color="white" />
            </a>
          </div>
          <a
            className="px-1"
            href="https://github.com/mdbootstrap/mdb-ui-kit"
            role="button"
          >
            <Github color="white" />
          </a>
        </div>
      </div>
    </nav>
  );
};
