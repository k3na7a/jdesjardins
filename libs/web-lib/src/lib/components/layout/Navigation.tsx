import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Navbar } from '../containers/header.component';

export function NavigationLayout() {
  const auth = useAuth();

  return (
    <>
      <header className="sticky-top">
        <Navbar
          loading={auth.loading}
          authenticatedUser={auth.authenticatedUser}
          logout={auth.logout}
          login={auth.login}
        />
      </header>
      <Outlet />
    </>
  );
}
