import { Outlet } from 'react-router-dom';
import { Navbar } from '../demo/DemoNavbar.component';

export function NavigationLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
