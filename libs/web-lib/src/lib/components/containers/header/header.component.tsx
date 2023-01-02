/* eslint-disable jsx-a11y/anchor-is-valid */
import './header.component.scss';

import { Github, Linkedin, Twitter } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { IAccessToken } from '@jdesjardins/dist-lib';
import { UserDropdown } from './components/userDropdown';
import { LoginButton } from './components/loginButton';

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

  const renderedNavItems = (navItems: NavItem[]) => {
    // if more than 4 NavItems exist, render 3 items and put the rest
    // in a more dropdown (This math is to avoid Dropsdowns with a single item)
    const INDEX = navItems.length > 4 ? 3 : 4;

    const topnav = navItems.splice(0, INDEX);
    const more = navItems.splice(-INDEX);

    const nav = topnav.map((navitem: NavItem) => {
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

    const dropdown = (
      <li key="dropown" className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Dropdown
        </a>
        <ul className="dropdown-menu dropdown-menu-dark m-0 text-small">
          <li>
            <a className="dropdown-item" href="#">
              Action
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Another action
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </li>
        </ul>
      </li>
    );
    return [...nav, dropdown];
  };

  const socialLinks = socials.map((social: Social) => {
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
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            {renderedNavItems(navItems)}
          </ul>
          <div className="d-flex align-items-center justify-content-end">
            {socialLinks}
            {loading ? (
              <button
                className="btn btn-dark ms-2 btn-sm btn-login"
                type="submit"
                disabled
              >
                {t('button.loading', i18n)}
              </button>
            ) : authenticatedUser ? (
              <UserDropdown logout={logout} role={authenticatedUser.role} />
            ) : (
              <LoginButton click={login} text={t('button.login', i18n)} />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
