import { AuthContextProvider } from './context';
import { useRoutes } from 'react-router-dom';

import { routes } from './routes';
import { Navbar } from './components/demo/DemoNavbar.component';

export function App() {
  const element = useRoutes(routes);

  return (
    <AuthContextProvider>
      {/* <Navbar /> */}
      {element}
    </AuthContextProvider>
  );
}
