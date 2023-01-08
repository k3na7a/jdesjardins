/* eslint-disable jsx-a11y/anchor-is-valid */
import './header.component.scss';

import { Github, Linkedin, Twitter } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import { useTranslation } from 'react-i18next';
import { IAccessToken } from '@jdesjardins/dist-lib';
import { UserDropdown } from '../../base/userDropdown';
import { LoginButton } from '../../base/loginButton';
import { Container, Nav, NavDropdown } from 'react-bootstrap';

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

export const NavbarComponent = ({
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

    return (
      <>
        {topnav.map((navitem: NavItem) => {
          return (
            <Nav.Link
              key={navitem.stub}
              onClick={() => navigate(`/${navitem.stub}`)}
              active={location === navitem.stub}
            >
              {navitem.label}
            </Nav.Link>
          );
        })}
        {more.length && (
          <NavDropdown
            key="more_dropdown"
            title="More..."
            menuVariant="dark"
            active={more.some((e: NavItem) => e.stub === location)}
          >
            <NavDropdown.Header>More Options</NavDropdown.Header>
            {more.map((navItem: NavItem) => {
              return (
                <NavDropdown.Item
                  key={navItem.stub}
                  as="button"
                  onClick={() => navigate(`/${navItem.stub}`)}
                  active={location === navItem.stub}
                >
                  {navItem.label}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
        )}
      </>
    );
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
    <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate(`home`)} className="noselect">
          <p>{t('title', i18n)}</p>
          <span>{t('subtitle', i18n)}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto mb-2 mb-md-0">
            {renderedNavItems(navItems)}
          </Nav>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
