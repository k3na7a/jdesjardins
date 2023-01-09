import { AuthContextProvider } from './context';
import { useRoutes } from 'react-router-dom';

import { routes } from './routes';
import { ModalProvider } from './context/modal.context';

export function App() {
  const element = useRoutes(routes);

  return (
    <ModalProvider>
      <AuthContextProvider>{element}</AuthContextProvider>
    </ModalProvider>
  );
}
