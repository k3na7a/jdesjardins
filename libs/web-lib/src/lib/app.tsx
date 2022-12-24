import { useContext } from 'react';
import { AuthContext } from '.';
import { NxWelcome } from './components';

export function App() {
  const ctx = useContext(AuthContext);

  if (ctx.authenticationIsLoading) return <>loading...</>;
  
  return (
    <main className="App">
      <NxWelcome title={''} />
    </main>
  );
}
