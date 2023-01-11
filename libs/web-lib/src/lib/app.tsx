import { AuthContextProvider } from './context';
import { useRoutes } from 'react-router-dom';

import { routes } from './routes';
import { ToastProvider } from './context/toast.context';
import { ModalProvider } from './context/modal.context';

export function App() {
  const element = useRoutes(routes);

  return (
    <ToastProvider>
      <AuthContextProvider>
        <ModalProvider>{element}</ModalProvider>
      </AuthContextProvider>
    </ToastProvider>
  );
}
