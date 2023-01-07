import { Outlet } from 'react-router-dom';
import { ModalContext, ModalProvider } from '../../context/modal.context';
import { useAuth } from '../../hooks';
import { Navbar } from '../containers';

import './Navigation.scss';

export function NavigationLayout() {
  const auth = useAuth();

  return (
    <ModalProvider>
      <div className="content">
        <header className="sticky-top">
          <Navbar
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
