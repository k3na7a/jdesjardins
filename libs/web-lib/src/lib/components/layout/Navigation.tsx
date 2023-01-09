import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { NavbarComponent } from '../containers';

export function NavigationLayout() {
  const auth = useAuth();

  return (
    <div className="content">
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
