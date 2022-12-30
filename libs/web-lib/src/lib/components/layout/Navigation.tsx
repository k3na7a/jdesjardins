import { Outlet } from 'react-router-dom';
import { Navbar } from '../containers/DemoNavbar.component';

export function NavigationLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
