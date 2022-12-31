import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Navbar } from '../containers';

export function NavigationLayout() {
  const auth = useAuth();

  return (
    <div className="content">
      <header className="sticky-top">
        <Navbar
          loading={auth.loading}
          authenticatedUser={auth.authenticatedUser}
          logout={auth.logout}
          login={auth.login}
        />
      </header>
      {auth.loading ? <>LOADING!</> : <Outlet />}
    </div>
  );
}
