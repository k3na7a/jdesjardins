import { Outlet } from 'react-router-dom';
import { ModalProvider } from '../../context/modal.context';
import { useAuth } from '../../hooks';
import { NavbarComponent } from '../containers';

import './Navigation.scss';

export function NavigationLayout() {
  const auth = useAuth();

  return (
    <ModalProvider>
      <div className="content">
        <header className="sticky-top">
          <NavbarComponent
            loading={auth.loading}
            authenticatedUser={auth.authenticatedUser}
            logout={auth.logout}
            login={auth.login}
          />
        </header>
        <div className="section">
          {auth.loading ? <>LOADING!</> : <Outlet />}
        </div>
      </div>
    </ModalProvider>
  );
}
