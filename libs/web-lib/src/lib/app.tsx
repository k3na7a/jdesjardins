import { useContext, useEffect } from 'react';
import { AuthContext } from '.';
import { NxWelcome } from './components';

export function App() {
  const ctx = useContext(AuthContext);

  if (ctx.authenticationIsLoading) return <>loading...</>;

  if (ctx.isAuthenticated && ctx.authenticatedUser)
    return (
      <main className="App">
        <NxWelcome title={ctx.authenticatedUser.username} />
      </main>
    );

  return <></>;
}
