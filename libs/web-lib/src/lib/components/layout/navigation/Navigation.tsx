import { Outlet } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import { Navbar } from '../../containers';

import './Navigation.css';

export function NavigationLayout() {
  const auth = useAuth();

  return (
    <div className="cover-container d-flex flex-column">
      <header className="sticky-top">
        <Navbar
          loading={auth.loading}
          authenticatedUser={auth.authenticatedUser}
          logout={auth.logout}
          login={auth.login}
        />
      </header>
      <main className="content w-100 m-auto">
        {auth.loading ? <>LOADING!</> : <Outlet />}
      </main>
    </div>
  );
}
