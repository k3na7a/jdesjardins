import { NxWelcome } from './components';
import { AuthContextProvider } from './context/auth.context';

export function App() {
  return (
    <AuthContextProvider>
      <main className="App">
        <NxWelcome title="" />
      </main>
    </AuthContextProvider>
  );
}
