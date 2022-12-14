import './header.component.scss';

import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

import { useTranslation } from 'react-i18next';
import { IAccessToken } from '@jdesjardins/dist-lib';
import { UserDropdown } from './userDropdown';
import { LoginButton } from './loginButton';
import { Container, Nav } from 'react-bootstrap';
import { NavItemList } from './navItems.component';

interface Props {
  loading: boolean;
  authenticatedUser: IAccessToken | undefined;
  logout: () => void;
}

export const NavbarComponent = ({
  loading,
  authenticatedUser,
  logout,
}: Props) => {
  const location = useLocation().pathname.split('/')[1];
  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect bg="primary" expand="md" variant="dark">
      <Container fluid="md">
        <Navbar.Brand onClick={() => navigate(`home`)} className="noselect">
          <p>{t('title', i18n)}</p>
          <span>{t('subtitle', i18n)}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto mb-2 mb-md-0">
            <NavItemList
              authenticatedUser={authenticatedUser}
              location={location}
            />
          </Nav>
          <div className="d-flex align-items-center justify-content-end">
            {authenticatedUser ? (
              <UserDropdown
                location={location}
                logout={logout}
                role={authenticatedUser.role}
              />
            ) : (
              <LoginButton loading={loading} text={t('button.login', i18n)} />
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
