import './header.component.scss';

import { Github, Linkedin, Twitter, PersonCircle } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { IAccessToken } from '@jdesjardins/dist-lib';

interface NavItem {
  label: string;
  stub: string;
}

interface Social {
  label: string;
  link: string;
  stub: string;
  icon: React.ReactNode;
}

interface Props {
  loading: boolean;
  authenticatedUser: IAccessToken | undefined;
  logout: () => void;
  login: (data: { username: string; password: string }) => void;
}

export const Navbar = ({
  loading,
  authenticatedUser,
  logout,
  login,
}: Props) => {
  const location = useLocation().pathname.split('/')[1];
  const { t, i18n } = useTranslation('common');

  const navItems: NavItem[] = [
    {
      label: 'Home',
      stub: 'home',
    },
    {
      label: 'Projects',
      stub: 'projects',
    },
    {
      label: 'About',
      stub: 'about',
    },
    {
      label: 'Admin',
      stub: 'admin',
    },
  ];

  const socials: Social[] = [
    {
      label: 'Twitter',
      stub: 'twitter',
      link: 'https://twitter.com/K38Tweets',
      icon: <Twitter />,
    },
    {
      label: 'Linkedin',
      stub: 'linkedin',
      link: 'https://www.linkedin.com/in/john-desjardins-96593914b/',
      icon: <Linkedin />,
    },
    {
      label: 'Github',
      stub: 'github',
      link: 'https://github.com/k3na7a/jdesjardins',
      icon: <Github />,
    },
  ];

  const nav = navItems.map((navitem: NavItem) => {
    return (
      <li key={navitem.stub} className="nav-item">
        <Link
          to={`/${navitem.stub}`}
          className={`nav-link ${location === navitem.stub ? 'active' : ''}`}
        >
          {navitem.label}
        </Link>
      </li>
    );
  });

  const _socialLinks = socials.map((social: Social) => {
    return (
      <a
        key={social.stub}
        className="social link-light opacity"
        href={social.link}
        role="button"
      >
        {social.icon}
      </a>
    );
  });

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <div className="container-fluid">
        <Link to={`/home`} className="navbar-brand noselect">
          <p>{t('title', i18n)}</p>
          <span>{t('subtitle', i18n)}</span>
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
          <ul className="navbar-nav me-auto mb-2 mb-md-0">{nav}</ul>
          <div className="d-flex align-items-center justify-content-end">
            {/* {socialLinks} */}
            {loading ? (
              <button
                className="btn btn-dark ms-2 btn-sm btn-login"
                type="submit"
                disabled
              >
                Loading
              </button>
            ) : authenticatedUser ? (
              <div className="dropdown text-end ms-3">
                <button
                  className="d-block dropdown-toggle btn btn-link text-light opacity"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <PersonCircle size="32" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark text-small">
                  <li>
                    <a className="dropdown-item" href="index.js">
                      New project...
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="index.js">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="index.js">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item btn-dark"
                      type="button"
                      onClick={logout}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="btn btn-dark ms-2 btn-sm btn-login"
                type="submit"
                onClick={() =>
                  login({
                    username: 'Jdesjardins',
                    password: 'Password123!',
                  })
                }
              >
                {t('button.login', i18n)}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
