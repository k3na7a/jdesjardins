import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context';
import { NavbarComponent } from '../containers';

import './Navigation.scss';

export function NavigationLayout() {
  const auth = useAuth();

  return (
    <div className="content w-100 d-flex flex-column">
      <header className="sticky-top">
        <NavbarComponent
          loading={auth.loading}
          authenticatedUser={auth.authenticatedUser}
          logout={auth.logout}
          login={auth.login}
        />
      </header>
      <div className="section">{auth.loading ? <>LOADING!</> : <Outlet />}</div>
    </div>
  );
}
