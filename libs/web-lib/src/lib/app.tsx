import { useCallback, useEffect, useMemo, useRef } from 'react';
import { pokeapi_pokemon } from './apis/pokeapi.axios';
import { NxWelcome } from './components';
import { useAxios } from './hooks';

interface Pokemon {
  id: number;
  name: string;
  sprite: {
    front_default: string;
  };
}

export function App() {
  const [data, _loading, _error, request] = useAxios<Pokemon>({
    instance: pokeapi_pokemon,
    onSuccess(res) {
      console.log(res);
    },
  });
  const requestRef = useRef(request);
  const pokemon = useMemo(() => data, [data]);

  useEffect(() => {
    requestRef.current({ url: 'pikachu' });
  }, [requestRef]);

  const getBublasaur = useCallback(() => console.log('hello'), []);

  return (
    <main className="App">
      <button onClick={getBublasaur}>PRESS ME</button>
      <NxWelcome title={pokemon?.name || '...'} />
    </main>
  );
}
