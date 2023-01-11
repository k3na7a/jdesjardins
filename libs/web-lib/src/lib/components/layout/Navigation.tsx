import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context';
import { ModalProvider } from '../../context/modal.context';
import { NavbarComponent } from '../base/navbar/header.component';

export function NavigationLayout() {
  const auth = useAuth();

  return (
    <div className="content w-100 d-flex flex-column bg-dark text-light">
      <header className="sticky-top">
        <NavbarComponent
          loading={auth.loading}
          authenticatedUser={auth.authenticatedUser}
          logout={auth.logout}
          login={auth.login}
        />
      </header>
      <Container fluid="md" className="section pt-2">
        {auth.loading ? <>LOADING!</> : <Outlet />}
      </Container>
    </div>
  );
}
