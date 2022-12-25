import { useContext } from 'react';
import { AuthContext } from '.';
import { NxWelcome } from './components';

export function App() {
  const ctx = useContext(AuthContext);

  if (ctx.authenticationIsLoading) return <>loading...</>;

  if (ctx.authenticatedUser)
    return (
      <main className="App">
        <NxWelcome title={ctx.authenticatedUser.username} />
      </main>
    );

  return <>Not Authorized to be here!</>;
}
