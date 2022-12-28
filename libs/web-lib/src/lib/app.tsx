import { AuthContextProvider } from './context';

export function App() {
  return (
    <AuthContextProvider>
      <main className="App" />
    </AuthContextProvider>
  );
}
