import { AuthContextProvider } from './context';
import { Route, Routes } from 'react-router-dom';

import { NxWelcome } from '@jdesjardins/ui-lib';

export function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<NxWelcome title={'router tutorial'} />} />
      </Routes>
    </AuthContextProvider>
  );
}
