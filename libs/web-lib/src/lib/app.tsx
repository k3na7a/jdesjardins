import { useContext } from 'react';
import { AuthContext } from '.';
import { NxWelcome } from './components';
import { Navbar } from './components/navbar.component';

export function App() {
  return (
    <main className="App">
      <Navbar />
      <NxWelcome title={''} />
    </main>
  );
}
