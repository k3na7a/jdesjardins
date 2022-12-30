import { AuthContextProvider } from './context';
import { useRoutes } from 'react-router-dom';

import { routes } from './routes';

export function App() {
  const element = useRoutes(routes);

  return <AuthContextProvider>{element}</AuthContextProvider>;
}
