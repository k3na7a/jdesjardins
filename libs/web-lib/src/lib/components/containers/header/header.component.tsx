/* eslint-disable jsx-a11y/anchor-is-valid */
import './header.component.scss';

import { Github, Linkedin, Twitter } from 'react-bootstrap-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { IAccessToken } from '@jdesjardins/dist-lib';
import { UserDropdown } from '../../base/userDropdown';
import { LoginButton } from '../../base/loginButton';

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
  const navigate = useNavigate();

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
          More...
        </a>
        <ul className="dropdown-menu dropdown-menu-dark m-0 text-small">
          {more.map((navItem: NavItem) => {
            return (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate(`/${navItem.stub}`)}
                >
                  {navItem.label}
                </button>
              </li>
            );
          })}
        </ul>
      </li>
    );

    if (more.length) return [...nav, dropdown];
    return nav;
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
    <nav className="navbar navbar-dark bg-primary navbar-expand-md">
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
            {authenticatedUser ? (
              <UserDropdown logout={logout} role={authenticatedUser.role} />
            ) : (
              <LoginButton
                loading={loading}
                click={login}
                text={t('button.login', i18n)}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
